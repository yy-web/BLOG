import express from 'express';
import crypto from 'crypto'
import User from '../model/user'
import Publish from '../model/Publish'
import Comment from '../model/comment'
import multer  from 'multer';
const upload = multer({ dest: 'upload/' });

const apiRouter = express.Router()
function checkLogin(req,res,next){
    if(req.session.user == '' || req.session.user == undefined){
        res.send(JSON.stringify({ code: 200, mes:'请先登录' }))
    }else{
        next()
    }

}
apiRouter.get('/',function(req,res,next){
    // if(req.session.user){
    //     req.session.user = req.session.user
    //
    // }else{
    //     req.session.user = null;
    // }
    console.log(req.session. user);
    next()
})
apiRouter.post('/search',function (req,res,next) {
  console.log('search---------------------------');
    const searchData = req.body.searchData;
    let data = {};
    if(searchData) {
        data['search']=new RegExp(searchData);//模糊查询参数
    }
    const num = req.body.num;
    const maxNum = 6;
    Publish.find({$or:[{title:data['search']},{content:data['search']}]},function(err,allDoc){
      Publish.find({$or:[{title:data['search']},{content:data['search']}]},function(err,doc){
          res.send(JSON.stringify({ code: 200 , max:allDoc.length ,data: doc }))
      }).skip((num - 1)*maxNum).limit(num*maxNum)
    })
})
apiRouter.post('/list',function (req,res,next) {
  console.log('list---------------------------');
    const num = req.body.num;
    const maxNum = 6;
    let data = {};
    if(req.body.user){
      data['user'] = req.body.user
    }
    console.log('list----data',data)
    Publish.find(data,function(err,allDoc){
      Publish.find({},function(err,doc){
          console.log('--------nouser')
          res.send(JSON.stringify({ code: 200, mes:'加载成功', max:allDoc.length ,data: doc }))
      }).skip((num - 1)*maxNum).limit(num*maxNum).sort( {date:-1 , times:-1 } )
    })
})
apiRouter.post('/delArticle',function(req,res){
    console.log('method get : delArticle---------------------------');
    const id = req.body.id;
    Publish.remove({_id:id},function(err,publish){
        if(err){
            console.log('delArticle',err)
        }
        console.log(publish.result)
        res.send(JSON.stringify({ code: 200, mes:'删除成功' }))
    })
})
apiRouter.get('/articleDetail',function(req,res){
    console.log('method get : articleDetail---------------------------');
    console.log('req',req.query.id);
    const id = req.query.id;
    Publish.update({_id:id},{$inc:{times:1}},function(err,publish){
        if(err){
            console.log('update',err)
        }
    })
})

apiRouter.post('/articleDetail',function(req,res){
    console.log('articleDetail---------------------------');
    const id = req.body.id;
    Publish.findOne({'_id':id},function(err,doc){
        res.send(JSON.stringify({ code: 200, Adetaile: doc }))
    })
})

apiRouter.post('/reg',function (req,res,next) {
    console.log('reg---------------------------');
    const md5 = crypto.createHash('md5')
    const userName = req.body.userName
    const password = md5.update(req.body.password).digest('base64')
    const userData = {
        userName:userName,
        password:password,
    }
    User.findOne({userName:userName},function (err,doc) {
        if(err){
            res.send(JSON.stringify({ code: 500, mes: '网路故障，稍后再试' }))
        }else if(doc){
            res.send(JSON.stringify({ code: 100, mes: '该用户名已经存在' }))
        }else {
            User.create(userData,function (err,doc) {
                if(err){
                    res.send(JSON.stringify({ code: 500, mes: '系统异常' }))
                }else{
                    res.send(JSON.stringify({ code: 200, mes: '已注册成功' }))
                }
            })
        }
    })

})
apiRouter.post('/login',function (req,res,next) {
    console.log('login---------------------------');
    const md5 = crypto.createHash('md5')
    const userName = req.body.userName
    const password = md5.update(req.body.password).digest('base64')
    const userData = {
        userName:userName,
        password:password,
    }
    User.findOne({userName:userName},function (err,doc) {
        if(err){
            res.send(JSON.stringify({ code: 500, mes: '网路故障，稍后再试' }))
        }else if(!doc){
            res.send(JSON.stringify({ mes: '该用户名不存在' }))
        }else {
            if(password != doc.password){
                res.send(JSON.stringify({ mes: '密码不正确' }))

            }else{
                req.session.user = doc.userName;
                res.send(JSON.stringify({ code: 200 ,mes: '登录成功',user:userName }))
            }

        }
    })
})
apiRouter.post('/logout',function (req,res,next) {

    console.log('logout---------------------------');
    req.session.user = '';
    res.send(JSON.stringify({ code: 200 ,mes: '登出成功',user:req.session.user }))
})
// apiRouter.get('/Publish',function(req,res,next){
//     Publish.find({},function(err,doc){
//         console.log(doc)
//     })
// })
apiRouter.post('/Publish',checkLogin ,upload.single('img'),function(req,res,next){
    console.log('Publish---------------------------');
    console.log('reqbody',req.body)
    console.log('reqflies',req.file.buffer)
    const title = req.body.title;
    const user = req.body.user;
    const content = req.body.content;
    const classify = req.body.classify;
    const acticleData = {
        title:title,
        user:user,
        content:content,
        classify:classify,
    }
    Publish.create(acticleData, function(err,doc) {
      if (err) {
          res.send(JSON.stringify({code: 500, mes: '网路故障，稍后再试'}))
      }
      res.send(JSON.stringify({  code: 200, mes: '发表成功',user:req.session.user}))
    })
})
apiRouter.post('/comment',function (req,res,next) {
    console.log('comment---------------------------');
    const user = req.body.user;
    const aId = req.body.aId;
    const content = req.body.content;
    const commentData = {
        user:user,
        content:content,
        aId:aId
    }
    Comment.create(commentData, function(err,commentDoc) {
      if (err) {
          res.send(JSON.stringify({code: 500, mes: '网路故障，稍后再试'}))
      }
      Comment.find({aId:aId},function(err,all){
        res.send(JSON.stringify({code: 200, mes: '发表成功',commentData:all}))
      })
    })


})
apiRouter.post('/commentData',function (req,res,next) {
    console.log('commentData---------------------------');
    const aId = req.body.aId;
    const commentData = {
        aId:aId
    }
    Comment.find(commentData, function(err,commentDoc) {
      if (err) {
        res.send(JSON.stringify({code: 500, mes: '网路故障，稍后再试'}))
      }
        res.send(JSON.stringify({code: 200, mes: '' ,commentData:commentDoc}))
    })


})
module.exports = apiRouter;
