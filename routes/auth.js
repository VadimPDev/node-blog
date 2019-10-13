const {Router} = require('express')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const {reqisterValidators} = require('../utils/validators')
const userModel = require('../models/users')
const auth = require('../middleware/auth')

const router = Router()

router.get('/login',(req,res)=>{
    res.render('auth/login',{
        title:'Вход',
    })
})

router.get('/register',(req,res)=>{
    res.render('auth/register',{
        title:'Регистрация'
    })
})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body

    const candidate = await userModel.findOne({email})

    if(candidate){
        const user = bcrypt.compare(password,candidate.password)
        if(user){
            req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save(err=>{
                    if(err){
                        throw err
                    }else{
                        res.redirect('/')
                    }
                })
        }else{
            req.flash('error','Пароль неверный')
            res.redirect('/login')
        }
    }else{
        req.flash('error','Такого пользователя не сущесвует')
        res.redirect('/login')
    }

})

router.post('/register',reqisterValidators,async(req,res)=>{
    const {username,email,password,password_confirm} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash('error',errors.array()[0].msg)
        return res.status(422).redirect('/auth/register')
    }

    const hash = await bcrypt.hash(password,10)
    const user = new userModel({username,email,password:hash})
    await user.save()
    res.redirect('/')


    console.log(req.body)
})

router.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})


module.exports = router