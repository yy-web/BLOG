import express from 'express';
import crypto from 'crypto'
import User from '../model/user'
import Publish from '../model/Publish'

const apiRouter = express.Router()


// apiRouter.get('/',function(req,res,next){
//     // if(req.session.user){
//     //     req.session.user = req.session.user
//     //
//     // }else{
//     //     req.session.user = null;
//     // }
//     console.log(1231);
// })

apiRouter.post('/list',function (req,res,next) {
        Publish.find({},function(err,doc){
        console.log('doc',doc)
        console.log('--------nouser')
        res.send(JSON.stringify({ code: 200, data: doc }))
    })
})
apiRouter.post('/myList',function(req,res){
    console.log('body',req.body)
    const user = req.body.user;
    Publish.findOne({'userName':user},function(err,doc){
        console.log('doc',doc)
        console.log('------user')
        res.send(JSON.stringify({ code: 200, data: doc }))
    })
})
apiRouter.post('/reg',function (req,res,next) {
    console.log('req',req.body)
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
                    console.log(err)
                    res.send(JSON.stringify({ code: 500, mes: '系统异常' }))
                }else{
                    res.send(JSON.stringify({ code: 200, mes: '已注册成功' }))
                }
            })
        }
    })

})
apiRouter.post('/login',function (req,res,next) {
    console.log('req',req.body)
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

              console.log(password)
              console.log(doc.password)
                res.send(JSON.stringify({ mes: '密码不正确' }))

            }else{
                req.session.user = doc.userName;
                res.send(JSON.stringify({ code: 200 ,mes: '登录成功',user:userName }))
}

        }
    })

})
apiRouter.get('/Publish',function(req,res,next){
    Publish.find({},function(err,doc){
        console.log(doc)
    })
})
apiRouter.post('/Publish',function(req,res,next){
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

    User.findOne({userName:user})
        .populate('userId','_id')
        .exec(function(err, doc) {
          acticleData.userId = doc._id
          Publish.create(acticleData, function(err) {
          if (err) {
              res.send(JSON.stringify({
                  code: 500,
                  mes: '网路故障，稍后再试'
              }))
          }
          res.send(JSON.stringify({
              code: 200,
              mes: '发表成功'
    }))
})
        });


})
module.exports = apiRouter;
