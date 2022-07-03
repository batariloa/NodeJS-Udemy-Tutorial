require('dotenv').config()

//async errors

const mongoDB = require('./db/connect')
const productRouter = require('./routes/products')
const express = require('express')
app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

//middlware
app.use(express.json())

//routes
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1> <a href="/api/v1/products">Products route</a>') 
})

app.use('/api/v1/products', productRouter)

//product route
app.use(notFoundMiddleware)
app.use(errorMiddleware)



const port = process.env.PORT || 3000

const start = async () =>{
    try{

        //connect to mongo
        await mongoDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server listening on port ${port}`))
    }
    catch(err){

    }
}


start()