// Express
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('express-async-errors');

const app = express();
dotenv.config();
const fileUpload = require('express-fileupload')

const cloudinary = require('cloudinary').v2
 cloudinary.config({
 cloud_name: process.env.CLOUD_NAME,
 api_key: process.env.CLOUD_API_KEY,
 api_secret: process.env.CLOUD_API_SECRET

 })
const morgan = require('morgan')
const cookieParser = require('cookie-parser')


//Database
mongoose.set('strictQuery', true)

//Routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const vacationRouter = require('./routes/vacationRoutes')
const familyRouter = require('./routes/familyRoutes')


//Middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.static('./public'))
app.use(morgan('tiny'))
app.use(express.json())
app.use(fileUpload({ useTempFiles: true }));
app.use(cookieParser(process.env.JWT_SECRET));



app.get('/', (req, res) => {
    res.send('Travel memoir')
})


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/vacations', vacationRouter);
app.use('/api/v1/families', familyRouter);



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async() => {
    
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected to db')
    } catch (error) {
        console.log(error)
    }
}
app.listen(port, ()=>{
    start()
console.log(`app listening on port ${5000} `)
})

