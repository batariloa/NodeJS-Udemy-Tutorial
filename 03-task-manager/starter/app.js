require('./db/connect')
const express = require('express');
const app = express();
const taskRoutes = require('./routes/task');
const connectDb = require('./db/connect')
require('dotenv').config()
const parser = require('body-parser')
const notfound = require('./middleware/notfound')
const errorHandler = require('./middleware/error-handler')


const port = 3000;

app.use(express.static('./public'))
app.use(parser.json())
app.use('/api/v1/tasks', taskRoutes)
app.use(notfound)
app.use(errorHandler) 

const start = async ()=>{

    try{
        await connectDb(process.env.MONGO_URI)
        app.listen(port,console.log('server is listening on 3000'));
    }
    catch{

    }
}

start()


