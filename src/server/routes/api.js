import express from 'express';
import crypto from 'crypto'
import User from '../model/user'

const apiRouter = express.Router()

/*apiRouter.get('/',function (req,res,next) {
    if(req.session.user){

    }else{
        req.session.user = null;
    }
    next()
})*/
apiRouter.post('/reg',function (req,res,next) {
    console.log('req',req.body)
    const md5 = crypto.createHash('md5')
    const userName = req.body.userName
   // const password = md5.update(req.body.password).digest('base64')
    const userData = {
        userName:userName,
        password:req.body.password,
    }
    User.findOne({userName:userName},function (err,doc) {
        if(err){
            res.send(JSON.stringify({ code: 500, message: '网路故障，稍后再试' }))
        }else if(doc){
            res.send(JSON.stringify({ code: 100, message: '该用户名已经存在' }))
        }else {
            User.create(userData,function (err,doc) {
                if(err){
                    console.log(err)
                    res.send(JSON.stringify({ code: 500, message: '系统异常' }))
                }else{
                    res.send(JSON.stringify({ code: 200, message: '已注册成功' }))
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
            res.send(JSON.stringify({ code: 500, message: '网路故障，稍后再试' }))
        }else if(!doc){
            res.send(JSON.stringify({ message: '该用户名不存在' }))
        }else {
            if(password != doc.password){
                res.send(JSON.stringify({ message: '密码不正确' }))
            }else{
                //req.session.user = doc.userName
                res.send(JSON.stringify({ code: 200 ,message: '登录成功',user:userName }))
}

        }
    })

})

module.exports = apiRouter;