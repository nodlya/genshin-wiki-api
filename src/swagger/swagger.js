const swaggerAutogen = require('swagger-autogen')();
const { join, dirname } = require('path');
const config = require('../config/config');

function generateSwagger() {
    const port = process.env.PORT || config.port;

    const _dirname = dirname(require.main.filename)
    const outputFile = join(_dirname, './swagger.json');
    const endpointsFiles = [join(_dirname, 'index.js')];

    const doc = {
        info: {
            title: 'Genshin Impact Api',
            description: 'Api for mobile wiki',
        },
        host: `localhost:${port}`,
        schemes: ['http', 'https'],
    };

    return swaggerAutogen(outputFile, endpointsFiles, doc)
}

module.exports = generateSwagger;