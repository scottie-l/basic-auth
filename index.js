// Connect to the database
// Require the ‘server’ and start it
'use strict';

require(dotenv).config();

const server = require('./app.js');
const sequelize = require('sequelize');
const PORT = process.env.PORT || 3000;

db.connect (process.env.DATABASE_URL, {

})
    .then(() => {
        server.start(PORT)
    })
    .catch(err => console.error('Could not start the server', err.message))

server.start(PORT);

// Exports an express app/server and a start method

module.exports = {
    start: (port) => {
        app.listen(port, () => {
            console.log('server is listening on port: ' + port);
        });
    },
    app,
}