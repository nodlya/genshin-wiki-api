const swaggerAutogen = require('swagger-autogen')();
const { join, dirname } = require('path');
const config = require('../config/config');

function generateSwagger(req) {
    const port = process.env.PORT || config.port;

    const _dirname = dirname(require.main.filename)
    const outputFile = join(_dirname, './src/swagger/swagger.json');
    const endpointsFiles = [join(_dirname, 'index.js')];

    const doc = {
        info: {
            title: 'Genshin Impact Api2',
            description: 'Api for mobile wiki',
        },
        host: req.get('host'),
        schemes: ['http', 'https'],
    };

    return swaggerAutogen(outputFile, endpointsFiles, doc)
}

module.exports = generateSwagger;