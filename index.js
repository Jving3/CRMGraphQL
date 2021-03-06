const { ApolloServer  } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });


const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//imports
const personRoutes = require('./oracle/routes/routes');

//settings
app.set('port', 4040);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(personRoutes);


//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 4040')
})



// Conectar a la base de datos
conectarDB();

// servidor
const server = new ApolloServer({
    typeDefs,
    resolvers, 
    context: ({req}) => {
        // console.log(req.headers['authorization'])

        // console.log(req.headers);

        const token = req.headers['authorization'] || '';
        if(token) {
            try {
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA );
                // console.log(usuario);
                return {
                    usuario
                }
            } catch (error) {
                console.log('Hubo un error');
                console.log(error);
            }
        }
    }
});

// arrancar el servidor
server.listen({ port: process.env.PORT || 4001 }).then( ({url}) => {
    console.log(`Servidor listo en la URL ${url}`)
} )