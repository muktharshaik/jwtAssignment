const express = require('express')
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')


const routes = require('./routes/main')

dotEnv.config();

const Url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.bmhdg.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`

mongoose.connect(Url,{useNewUrlParser: true, useUnifiedTopology:true})
mongoose.set('useCreateIndex', true);

const app = express();
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));

app.use(routes)

app.listen(3004, ()=>{
    console.log("On 3004");
})