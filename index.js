//import * as schemas from './schemas.js';
//import mongoose from 'mongoose';
//import config from './src/config/config';
//import { express } from 'express';
//import {cors} from 'cors';
const config = require('./src/config/config');
const CharacterController = require("./src/controllers/CharacterController");
const WeaponController = require("./src/controllers/WeaponController");

const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || config.port;
const db = `mongodb+srv://${config.dbUser.userName}:${config.dbUser.password}@cluster0.czj4pwj.mongodb.net/Genshin_wiki_database?retryWrites=true&w=majority`;

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
    })
    app.get('/characters',CharacterController.getAllCharacters);
    app.get('/character/:characterId',CharacterController.getCharacterById);
    app.get('/weapons',WeaponController.getAllWeapon)
}

const main = () => {
    initDb()
    initRouters()
    initClient()
}

main()