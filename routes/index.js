const {Router} = require('express')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const contact = require('../email/contact')
const Posts = require('../models/posts')
const keys = require('../keys')

const transporter = nodemailer.createTransport(sendgrid({
    auth:{api_key:keys.SENDGRID_API}
}))


const router = Router()

router.get('/',async(req,res)=>{

    const posts = await Posts.find().sort({created_at:-1}).limit(5)
    res.render('index',{
        title:"Главная",
        posts,
        index:2
    })
})

router.get('/page/:page',async(req,res)=>{

    const page = req.params.page
    const index = parseInt(page) + 1

    const skip = 5 *(page -1)

    const posts = await Posts.find().sort({created_at:-1}).skip(skip).limit(5)
    res.render('index',{
        title:"Главная",
        posts,
        index
    })
})



router.get('/about',(req,res)=>{
    res.render('about',{
        title:'О нас'
    })
})
router.get('/contact',(req,res)=>{
    res.render('contact',{
        title:'Контакты'
    })
})

router.post('/contact',async(req,res)=>{
    const {name,email,phone,message} = req.body
    await transporter.sendMail(contact(email,message))
    res.redirect('/')
})

module.exports = router