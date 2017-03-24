import express from 'express';
import crypto from 'crypto'
import User from '../model/user'
import Publish from '../model/Publish'
import Comment from '../model/comment'

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
    console.log(req.session.user);
    next()
})

apiRouter.post('/list',function (req,res,next) {
    console.log('list---------------------------');
        Publish.find({},function(err,doc){
        console.log('--------nouser')
        res.send(JSON.stringify({ code: 200, data: doc }))
    }).skip(0).limit(1)
})
apiRouter.post('/articleDetail',function(req,res){
    console.log('articleDetail---------------------------');
    const id = req.body.id;
    Publish.findOne({'_id':id},function(err,doc){
        res.send(JSON.stringify({ code: 200, Adetaile: doc }))
    })
})
apiRouter.post('/myList',function(req,res){
    console.log('myList---------------------------');
    const user = req.body.user;
    console.log('--------user')
    Publish.find({'user':user},function(err,doc){
        res.send(JSON.stringify({ code: 200, data: doc }))
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
    console.log('body',req.body)
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
    apiRouter.post('/Publish',checkLogin ,function(req,res,next){
    console.log('Publish---------------------------');
    console.log('flie',req.file);
    console.log('body',req.body);
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
    User.find({userName:user})
        .populate('userId','_id')
        .exec(function(err, doc) {
          acticleData.userId = doc._id
          Publish.create(acticleData, function(err,doc) {
          if (err) {
              res.send(JSON.stringify({code: 500, mes: '网路故障，稍后再试'}))
          }
          res.send(JSON.stringify({  code: 200, mes: '发表成功',user:req.session.user}))
        })
        });


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
        console.log('commentData',commentDoc);
      if (err) {
        res.send(JSON.stringify({code: 500, mes: '网路故障，稍后再试'}))
      }
        res.send(JSON.stringify({code: 200, mes: '' ,commentData:commentDoc}))
    })


})
module.exports = apiRouter;
