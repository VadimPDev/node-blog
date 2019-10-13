const {Router} = require('express')
const auth = require('../middleware/auth')
const posts = require('../models/posts')
const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/posts/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.png')
    }
  })
const upload = multer({ storage:storage })

const router = Router()

router.get('/create',auth,(req,res)=>{
    res.render('posts/create',{
        title:'Создание статьи',
        layout:'admin'
    })
})

router.get('/:id',async(req,res)=>{
    const id = req.params.id

    const post = await posts.findById({_id:id})

    res.render('posts/view',{
        title:post.title,
        post
    })
})

router.get('/',auth,async(req,res)=>{
  const postsData = await posts.find().sort({created_at:-1})
  res.render('posts/index',{
    title:'Все статьи',
    layout:'admin',
    postsData
  })
})

router.post('/create',auth,upload.single('image'),async(req,res)=>{
    const {title,short,full} = req.body

    console.log(req.body)
    console.log(req.file)
    const post = new posts({title,short,full,author:req.user.username,img:req.file.filename})
    await post.save()
    res.status(200).json(['success','Новость добавлена'])   

})

router.delete('/remove/:id',auth,async(req,res)=>{
  const id = req.params.id

  await posts.findByIdAndDelete({_id:id})
  res.status(200).json(['sucess','Запись удалена'])
})


module.exports = router