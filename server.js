const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const schema = require('./schema');
const resolvers = require('./resolvers');
const db = require('./models/index');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
// const auth = require('./auth');   // Obsolte in v8
const { makeExecutableSchema } = require('@graphql-tools/schema');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config({path: 'variables.env'})
// Options cors
var cors = require('cors')
var corsOptions = {
  // origin: 'https://cliente-agricola.vercel.app',
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

const app = express()
app.use(cors(corsOptions))

// Denego ruta de acceso al servidor
app.get('/', function(req,res){
  res.status(200).send('Pagina no accesible, ingrese a https://cliente-agricola.vercel.app');
});

// Encabezados para peticiones
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


// Funcion para obtener token
const getMe = async req => {
  // obtener el token del servidor
  const token = req.headers['authorization'] || ''

  if(token) {
    try {
      // verificar el token del frontend usuario
      const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETO)

      return {
        usuario
      }
    } catch (err) {
      console.error(err)
    }
  }
}

// Creo instancia del schema de graphql
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers   
});

// Creo servidor de apollo server
async function startServer() {
  const server = new ApolloServer({
    schema: executableSchema,
    context: {db},
    introspection: true,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground()
    ],
    context: async({ req }) => {
      const me = await getMe(req)
  
      return {
        db,
        me
        //secreto: process.env.SECRETO
      }
    }
  })

  await server.start();
  server.applyMiddleware({app})

  //models.sequelize.authenticate()
  //models.sequelize.sync()

  // developmet
  // app.listen({ port: 8000 }, () => {
  //   console.log(`El servidor esta corriendo http://localhost:8000${server.graphqlPath}`)
  // })

  // production
  const PORT = process.env.PORT || 3050
  app.listen(PORT, () => {
    return null
  })
}

startServer()

module.exports= app;