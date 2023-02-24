//import * as schemas from './schemas.js';
//import mongoose from 'mongoose';
//import config from './src/config/config';
//import { express } from 'express';
//import {cors} from 'cors';

const mongoose = require('mongoose');
const express = require('express');
const config = require('./src/config/config')
const cors = require('cors');
const schemas = require('./schemas');

const app = express();
const port = process.env.PORT || config.port;
const db = `mongodb+srv://${config.dbUser.userName}:${config.dbUser.password}@cluster0.czj4pwj.mongodb.net/Genshin_wiki_database?retryWrites=true&w=majority`;
const {weaponType} = schemas;

const initDb = () => {
    mongoose.set('strictQuery', true);
    mongoose
        .connect(db)
        .then(()=>{
            console.log("database ok")
        })
        .catch(e=>{
            console.log("database err\n",e)
        })
}
const initClient = () => {
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

    app.listen(port,()=>{console.log(`server start on http://localhost:${port}`)})
}
const initRouters = () => {
    app.get('/',(req,res)=>{
        console.log("hello world")
    },
    app.get('/all_characters', async (req, res) => {
        // for (let key of Object.keys(schemas)){
        //     console.log(key);
        //     schemas[key].find({});
        // }
        let t = await weaponType.find({});
        console.log(t);
    })
    )
    //ToDo add routers to app
}

const main = () => {
    initDb()
    initRouters()
    initClient()
}

main()