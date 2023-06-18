const config = require('./src/config/config');
const {getAllCharacters, getCharacterById} = require("./src/controllers/CharacterController");
const {idValidator, dayValidator} = require("./src/validators/DataValidator");
const {getAllWeapon, getWeaponById} = require("./src/controllers/WeaponController");
const {getAllArtifacts, getArtifactById} = require("./src/controllers/ArtifactController");
const {getDungeonResourcesByDay} = require("./src/controllers/DungeonResourceController");
const swaggerUi = require('swagger-ui-express');
const generateSwagger = require("./src/swagger/swagger.js");
const readFile = require("fs").readFileSync;

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
        .then(() => {
            console.log("database ok")
            /*console.log(db)*/
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
    app.listen(port, () => {
        console.log(`server started on http://localhost:${port}`)
    })
}
const initRouters = () => {
    app.get('/', (req, res) => {
        res.send('Hello it\'s Genshin api');
        generateSwagger(req.get('host')).then(() => {
            const swaggerDoc = JSON.parse(readFile('./src/swagger/swagger.json', "utf8"));
            app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
        })
    })
    app.get('/characters', getAllCharacters);
    app.get('/character/:characterId', idValidator("characterId"), getCharacterById);
    app.get('/weapons', getAllWeapon);
    app.get('/weapon/:weaponId', idValidator("weaponId"), getWeaponById);
    app.get('/artifacts', getAllArtifacts);
    app.get('/artifact/:artifactId', idValidator("artifactId"), getArtifactById);
    app.get('/dungeonResource/:dayOfWeek', dayValidator(), getDungeonResourcesByDay);
}

const main = () => {
    initDb()
    initRouters()
    initClient()
}

main()