'use strict';

const Hapi = require('hapi');

// Set Port
const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route(require('./routes.js'));

/*
// Home Route
server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return '<h1>Hello, world!</h1>';
    }
});

// Dynamic Route
server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {

        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});
*/

const init = async () => {

    // Pino plugin for logging
    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response', 'onPostStart']
        }
    });

    await server.register(require('inert'));
/*
    // Static Route
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return h.file('./public/index.html');
        }
    });
*/
    // Start server and handle errors... necessary?
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

// Does this handle all errors?
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();