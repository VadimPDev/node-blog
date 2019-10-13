const {body} = require('express-validator')
const User = require('../models/users')

exports.reqisterValidators = [
    body('email').isEmail().withMessage('Введите коректный email').custom(async (value,{req})=>{
        try{
            const candidate = await User.findOne({email:value})
            if(candidate){
                return Promise.reject('Пользователь уже существует')
            }
        }catch(e){
            console.log(e)
        }
    }).normalizeEmail(),
    body('password','Пароль должен мин 6 символов').isLength({min:6,max:56}).isAlphanumeric().trim(),
    body('password_confirm').custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error('пароли должны совпдать')
        }
        return true
    }).trim(),
    body('username').isLength({min:3}).withMessage('Имя должны быть минимум 3  символа').trim()
]