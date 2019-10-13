const express = require('express')
const path = require('path')
const csurf = require('csurf')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const variablesMiddelware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')
const IndexRouter = require('./routes/index')
const authRoutes = require('./routes/auth')
const postsRoutes = require('./routes/posts')
const keys = require('./keys')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const store = new MongoStore({
    collection:'sessions',
    uri:keys.MONGODB_URI
})

const hbs = exphbs.create({
    defaultLayout:'main',
    extname:'hbs',
    helpers:{

        prettifyDate:  function(timestamp) {
            function addZero(i) {
                if (i < 10) {
                  i = "0" + i;
                }
                return i;
            }

            var curr_date = timestamp.getDate();
            var curr_month = timestamp.getMonth();
            curr_month++;
            var curr_year = timestamp.getFullYear();

            var curr_hour = timestamp.getHours();
            var curr_minutes = timestamp.getMinutes();
            var curr_seconds = timestamp.getSeconds();

            result = addZero(curr_date)+ "/" + addZero(curr_month) + "/" + addZero(curr_year)+ '   ' +addZero(curr_hour)+':'+addZero(curr_minutes)+':'+addZero(curr_seconds);
            return result;
        }

    }
})

app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','views')

app.use(express.static(path.join(__dirname,'public')))
app.use(session({
    secret:keys.SECRET,
    resave:false,
    saveUninitialized:false,
    store
}))
app.use(csurf())
app.use(flash())

app.use(variablesMiddelware)
app.use(userMiddleware)


app.use('/',IndexRouter)
app.use('/',authRoutes)
app.use('/posts',postsRoutes)

const PORT = process.argv.PORT || 3000

async function start(){
    try{
        await mongoose.connect(keys.MONGODB_URI,{useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology: true})

        app.listen(PORT,()=>{
            console.log('Server running on port:',PORT)
        })
    }catch(e){
        console.log(e)
    }
}
start()