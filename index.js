const config = require('./src/config/config');
const { getAllCharacters, getCharacterById } = require("./src/controllers/CharacterController");
const { getCharacterValidator } = require("./src/validators/CharacterValidator");
const WeaponController = require("./src/controllers/WeaponController");
const ArtifactController = require("./src/controllers/ArtifactController");
const swaggerUi = require('swagger-ui-express');
const generateSwagger = require("./src/swagger/swagger.js");
const readFile = require("fs").readFileSync;

const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const swaggerDocument = require('./src/swagger/swagger.json');
const app = express();
const port = process.env.PORT || config.port;
const db = `mongodb+srv://${config.dbUser.userName}:${config.dbUser.password}@cluster0.czj4pwj.mongodb.net/Genshin_wiki_database?retryWrites=true&w=majority`;

const initDb = () => {
    mongoose.set('strictQuery', true);
    mongoose
        .connect(db)
        .then(() => {
            console.log("database ok")
        })
        .catch(e => {
            console.log("database err\n", e)
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
    //app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.listen(port, () => { console.log(`server started`) })

}
const initRouters = () => {

    app.get('/', (req, res) => {
        console.log(req)
        res.send('Hello it\' Genshin api');
        generateSwagger(req).then(async () => {
            const swaggerDoc = JSON.parse(readFile('./src/swagger/swagger.json', "utf8"));
            app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

        })
    })
    app.get('/characters', getAllCharacters);
    app.get('/characters/:characterId', getCharacterValidator(), getCharacterById);
    app.get('/weapons', WeaponController.getAllWeapon)
    app.get('/artifacts', ArtifactController.getAllArtifacts)
}

const main = () => {
    initDb()
    initRouters()
    initClient()
}

main()