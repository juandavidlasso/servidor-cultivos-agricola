const express = require('express');
// Grahpql
const {ApolloServer} = require('apollo-server-express');
const schema = require('./schema');
const resolvers = require('./resolvers');
const db = require('./models/index'); 
const auth = require('./auth');
const { makeExecutableSchema} = require('graphql-tools');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config({path: 'variables.env'})
// var cors = require('cors')
// var corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
const getMe = async req => {
  
  // obtener el token del servidor
  const token = req.headers['authorization'] || ''

  if(token) {
    try {
      // verificar el token del frontend usuario
      const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETO)

      // agregamos el usuaurio actual al request
      //req.usuarioActual = usuarioActual

      return {
        usuario
      }
    } catch (err) {
      console.error(err)
    }
  }
}
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
  schemaDirectives: {
    auth: auth
    },     
 });
const server = new ApolloServer({
  schema: executableSchema,
  context: {db},
  context: async({ req }) => {
    const me = await getMe(req)

    return {
      db,
      me
      //secreto: process.env.SECRETO
    }
  },
  playground: true,
  introspection: true,
})
//cors(corsOptions)
const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.get('/', function(req,res){
  res.status(200).send('Pagina no accesible, ingrese a https://servidor-cultivos-agricola.herokuapp.com/graphql');
});

server.applyMiddleware({app})
//models.sequelize.authenticate()
//models.sequelize.sync()

// production
const PORT = process.env.PORT || 3050
app.listen(PORT, () => {
  return null
})


// developmet
// const port = process.env.PORT || 8000;
// app.listen({port: 8000}, () => console.log(`El servidor esta corriendo http://localhost:8000${server.graphqlPath}`))

module.exports= app;