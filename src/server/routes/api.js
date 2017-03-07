import express from 'express';
import crypto from 'crypto'
import User from '../model/user'

const apiRouter = express.Router()

apiRouter.get('/',function (req,res,next) {
  console.log('session',req.session.user)
  console.log('cookies',req.cookies);
    // if(req.session.user){
    //     req.session.user = req.session.user
    //
    // }else{
    //     req.session.user = null;
    // }
    next()
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
      console.log('user')
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
                req.session.save()
                console.log('session1',req.session.user)
                console.log('cookies1',req.cookies)
                res.send(JSON.stringify({ code: 200 ,mes: '登录成功',user:userName }))
}

        }
    })

})

module.exports = apiRouter;
