const mongoose = require('mongoose');
const express = require('express');
const config = require('./src/config/config')
const cors = require('cors');

const app = express();
const port = process.env.PORT || config.port;
const db = `mongodb+srv://${config.dbUser.userName}:${config.dbUser.password}@cluster0.czj4pwj.mongodb.net/?retryWrites=true&w=majority`

const initDb = () => {
    mongoose
        .connect(db)
        .then(()=>{
            console.log("database ok")
        })
        .catch(e=>{
            console.log("database err",e)
        })
}
const main = () => {
    initDb()
    app.use(express.json());
    app.use(
        cors({
            optionsSuccessStatus: 200,
            origin: "*",
            allowedHeaders: [
                "Content-Type",
                "Authorization",
                "Access-Control-Allow-Methods",
                "Access-Control-Request-Headers",
            ],
        })
    );
    app.get('/',()=>{
        console.log("hello world")
    })
    app.listen(port,()=>{console.log("server start")})
}

main()