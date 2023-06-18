const swaggerAutogen = require('swagger-autogen')();
const { join, dirname } = require('path');

function generateSwagger(url) {
    const _dirname = dirname(require.main.filename)
    const outputFile = join(_dirname, './src/swagger/swagger.json');
    const endpointsFiles = [join(_dirname, 'index.js')];

    const doc = {
        info: {
            title: 'Genshin Impact Api',
            description: 'Api for mobile wiki',
        },
        host: url,
        schemes: ['http', 'https'],
    };

    return swaggerAutogen(outputFile, endpointsFiles, doc)
}

module.exports = generateSwagger;