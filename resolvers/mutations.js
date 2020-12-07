const bcryptjs = require('bcryptjs');
// Generar Token
require ('dotenv').config();

const jwt = require('jsonwebtoken');

const crearToken = (usuario, secreto, expiresIn) => {
  const { id_usuario, nombre, apellido, email, rol } = usuario

  return jwt.sign( { id_usuario, nombre, apellido, email, rol }, secreto, {expiresIn})
}
module.exports= {
  agregarUsuario: async (parent, { input }, { db }, info) => {

    const { email, password } = input

    // revisar si hay usuario repetido
    const existeUsuario = await db.Usuarios.findOne({ where: {email} })

    if(existeUsuario) {
      throw new Error(`El email ${email} ya esta registrado.`)
    }

    // hashear el password
    const salt = await bcryptjs.genSalt(10)
    input.password = await bcryptjs.hash(password, salt)

    // crear el usuario
    try {
      return await db.Usuarios.create(input)
    } catch (error) {
      return null
    }
  },
  autenticarUsuario: async (parent, { input }, { db }, info) => {

    const { email, password } = input

    // revisar si existe usuario registrado
    const existeUsuario = await db.Usuarios.findOne({ where: {email} })

    if(!existeUsuario) {
      throw new Error(`El usuario con email: ${email} no esta registrado.`)
    }

    // revisar el password
    const passCorrecto = await bcryptjs.compare(password, existeUsuario.password)

    if(!passCorrecto) {
      throw new Error('Password Incorrecto.')
    }

    return{
      token: crearToken(existeUsuario, process.env.SECRETO, '24hr')
    }
  },
  agregarSuerte: async (parent, {input}, {db}, info) => {
    // revisar si hay suerte repetido
    const existeSuerte = await db.Suertes.findOne({ where: {nombre: input.nombre} })

    if(existeSuerte) {
      throw new Error(`La suerte ${input.nombre} ya esta registrada.`)
    }

    // crear la suerte
    try {
      return await db.Suertes.create(input)
    } catch (error) {
      return null    
    }
  },
  agregarSuerteRenovada: async (parent, {suerte}, {db}, info) => {
    try {
      return  db.Suertes.count({
        where: {
          nombre: suerte.nombre
        }
      }).then(count=> {
        if(count!=0){
          return db.Suertes.findAll({
            where: {
              createdAt: [ db.sequelize.literal(`(
                SELECT MAX(createdAt)
                FROM Suertes AS suerte
                WHERE
                suerte.nombre = '${suerte.nombre}'
                )`),'MaxCreatedAt'],
                nombre: suerte.nombre
            },
            attributes: ['id_suerte']
          }).then((suertecita)=> {
            return db.Suertes.update({
              renovada:'NO'
            },
            { where: {
              id_suerte: suertecita[suertecita.length-1].id_suerte,renovada:'SI'
              }
            }).then(()=>{
              suerte.renovada='SI';
              return db.Suertes.create({
                ...suerte}).then((newSuerte) => {                            
                  return newSuerte;
                });      
              });
          });
        } else {
          suerte.renovada='SI';      
          return db.Suertes.create({
            ...suerte
          }).then((newSuerte) => {
            return newSuerte;
          });
        }
      });      
    } catch (error) {
      return null
    }  
  },
<<<<<<< HEAD
  agregarTablon: async (parent, {input, id_corte}, {db}, info) => {
=======
  agregarTablon: async (parent, {input, id_suerte}, {db}, info) => {
>>>>>>> e647131971aeb667a205d688b46ac6103896c168
    // revisar si hay tablon repetido
    const existeTablon = await db.Tablones.findOne({
      where: {
        numero: input.numero,
<<<<<<< HEAD
        corte_id: id_corte
=======
        suerte_id: id_suerte
>>>>>>> e647131971aeb667a205d688b46ac6103896c168
      }
    })

    if(existeTablon) {
      throw new Error(`El tablón ${input.numero} ya esta registrado.`)
    }

    // crear el tablon
    try {
      return await db.Tablones.create(input)
    } catch (error) {
      return null     
    }
  },
  agregarCorte: async (parent, {input}, {db}, info) => {
    // crear corte
    try {
      return await db.Cortes.create(input)
    } catch (error) {
      return null    
    }
  },
  actualizarCorte: async (parent, {id_corte, input}, {db}, info) => {
    // actualizar corte
    try {
      const corte = await db.Cortes.findOne({ where: {id_corte} })

      if(!corte) {
        throw new Error('No existe')
      }

      await corte.update(input, { where:{id_corte} })
      return corte
    } catch (error) {
      return null    
    }
  },
  agregarLabor: async (parent, {input}, {db}, info) => {
    // crear labor
    try {
      return await db.Labores.create(input)
    } catch (error) {
      return null   
    } 
  },
  agregarAplicacionHerbicida: async (parent, {input}, {db}, info) => {
    // crear aplicacion herbicida
    try {
      return await db.Aplicacion_herbicidas.create({
        fecha: input.fecha,
        tipo: input.tipo,
        corte_id: input.corte_id
      })
    } catch (error) {
      return null    
    }
  },
  agregarTratamientoHerbicidas: async (parent, {input}, {db}, info) => {
    // crear tratamiento herbicida
    try {
      return await db.Tratamiento_herbicidas.create({
        producto: input.producto,
        dosis: input.dosis,
        presentacion: input.presentacion,
        valor: input.valor,
        aplico: input.aplico,
        nota: input.nota,
        aphe_id: input.aphe_id
      })
    } catch (error) {
      return null     
    }
  },
  agregarAplicacionFertilizante: async (parent, {input}, {db}, info) => {
    // crear aplicacion fertilizante
    try {
      return await db.Aplicacion_fertilizantes.create(input)
    } catch (error) {
      return null    
    }
  },
  agregarTratamientoFertilizante: async (parent, {input}, {db}, info) => {
    // crear tratamiento fertilizante
    try {
      return await db.Tratamiento_fertilizantes.create(input)
    } catch (error) {
      return null    
    }
  },
  agregarPluviometro: async (parent, {input}, {db}, info) => {
    // revisar si existe pluviometro
    const existePluviometro = await db.Pluviometros.findOne({ where: {nombre: input.nombre} })

    if(existePluviometro) {
      throw new Error(`El pluviómetro ${input.nombre} ya esta registrado.`)
    }

    // crear pluviometro
    try {
      return await db.Pluviometros.create(input)
    } catch (error) {
      return null   
    }
  },
  agregarLluvia: async (parent, {input}, {db}, info) => {
    // crear lluvia
    try {
      return await db.Lluvias.create(input)
    } catch (error) {
      return null   
    }
  },
  agregarCosecha: async (root, {input}, {db}, info) => {
    // crear cosecha
    try {
      return await db.Cosechas.create(input)
    } catch (error) {
      return null          
    }
  },
  actualizarCosecha: async (parent, {id_cosecha, input}, {db}, info) => {
    // actualizar cosecha
    const cosecha = await db.Cosechas.findOne({ where: {id_cosecha} })

    if(!cosecha) {
      throw new Error ('No existe')
    }

    try {
      await cosecha.update(input, {where: {id_cosecha}} )
      return cosecha
    } catch (error) {
      return null   
    }
  },
  agregarAplicacionPlaga: async (parent, {input}, {db}, info) => {
    // crear aplicacion plaga
    try {
      return await db.Aplicacion_plagas.create(input)
    } catch (error) {
      return null    
    }
  },
  agregarTratamientoPlaga: async (parent, {input}, {db}, info) => {
    // crear tratamiento plaga
    try {
      return await db.Tratamiento_plagas.create(input)
    } catch (error) {
      return null    
    }
  },
  actualizarEmail: async (parent, {id_usuario, input}, {db}, info) => {
    // actualizar email usuarios
    const {password} = input
    const buscarEmail = await db.Usuarios.findOne({ where: {id_usuario} })

    if(!buscarEmail) {
      throw new Error('No existe')
    }

    try {
      // hashear el password
      const salt = await bcryptjs.genSalt(10)
      input.password = await bcryptjs.hash(password, salt)

      await buscarEmail.update(input, { where: {id_usuario} })
      return buscarEmail
    } catch (error) {
      return null   
    }
  },
  actualizarSuerte: async (parent, {id_suerte, input}, {db}, info) => {
    // actualizar suerte
    const buscarSuerte = await db.Suertes.findOne({ where: {id_suerte} })

    if(!buscarSuerte) {
      throw new Error('No existe')
    }

    try {
      await buscarSuerte.update(input, { where: {id_suerte} })
      return buscarSuerte
    } catch (error) {
      return null
    }
  },
  actualizarDatosCorte: async (parent, {id_corte, input}, {db}, info) => {
    // actualizar corte
    const buscarCorte = await db.Cortes.findOne({ where: {id_corte} })

    if(!buscarCorte) {
      throw new Error('No existe')
    }

    try {
      await buscarCorte.update(input, { where: {id_corte} })
      return buscarCorte
    } catch (error) {
      return null    
    }
  },
  actualizarLabor: async (parent, {id_labor, input}, {db}, info) => {
    // actualizar labor
    const buscarLabor = await db.Labores.findOne({ where: {id_labor} })

    if(!buscarLabor) {
      throw new Error('No existe')
    }

    try {
      await buscarLabor.update(input, { where: {id_labor} })
      return buscarLabor
    } catch (error) {
      return null    
    }
  },
  actualizarAPHE: async (parent, {id_aphe, input}, {db}, info) => {
    // actualizar aplicacion herbicida
    const buscarAPHE = await db.Aplicacion_herbicidas.findOne({ where: {id_aphe} })

    if(!buscarAPHE) {
      throw new Error('No existe')
    }

    try {
      await buscarAPHE.update(input, { where: {id_aphe} })
      return buscarAPHE
    } catch (error) {
      return null    
    }
  },
  actualizarTRAHE: async (parent, {id_trahe, input}, {db}, info) => {
    // actualizar tratamiento herbicida
    const buscarTRAHE = await db.Tratamiento_herbicidas.findOne({ where: {id_trahe} })

    if(!buscarTRAHE) {
      throw new Error('No existe')
    }

    try {
      await buscarTRAHE.update(input, { where: {id_trahe} })
      return buscarTRAHE
    } catch (error) {
      return null    
    }
  },
  actualizarAPFE: async (parent, {id_apfe, input}, {db}, info) => {
    // actualizar aplicacion herbicida
    const buscarAPFE = await db.Aplicacion_fertilizantes.findOne({ where: {id_apfe} })

    if(!buscarAPFE) {
      throw new Error('No existe')
    }

    try {
      await buscarAPFE.update(input, { where: {id_apfe} })
      return buscarAPFE
    } catch (error) {
      return null    
    }
  },
  actualizarTRAFE: async (parent, {id_trafe, input}, {db}, info) => {
    // actualizar tratamiento herbicida
    const buscarTRAFE = await db.Tratamiento_fertilizantes.findOne({ where: {id_trafe} })

    if(!buscarTRAFE) {
      throw new Error('No existe')
    }

    try {
      await buscarTRAFE.update(input, { where: {id_trafe} })
      return buscarTRAFE
    } catch (error) {
      return null     
    }
  },
  actualizarAPLA: async (parent, {id_apla, input}, {db}, info) => {
    // actualizar aplicacion plaga
    const buscarAPLA = await db.Aplicacion_plagas.findOne({ where: {id_apla} })

    if(!buscarAPLA) {
      throw new Error('No existe')
    }

    try {
      await buscarAPLA.update(input, { where: {id_apla} })
      return buscarAPLA
    } catch (error) {
      return null    
    }
  },
  actualizarTRAPL: async (parent, {id_trapl, input}, {db}, info) => {
    // actualizar tratamiento plaga
    const buscarTRAPL = await db.Tratamiento_plagas.findOne({ where: {id_trapl} })

    if(!buscarTRAPL) {
      throw new Error('No existe')
    }

    try {
      await buscarTRAPL.update(input, { where: {id_trapl} })
      return buscarTRAPL
    } catch (error) {
      return null    
    }
  },
  actualizarTablon: async (parent, {id_tablon, input}, {db}, info) => {
    // actualizar tablon
    const buscarTablon = await db.Tablones.findOne({ where: {id_tablon} })

    if(!buscarTablon) {
      throw new Error('No existe')
    }

    try {
      await buscarTablon.update(input, { where: {id_tablon} })
      return buscarTablon
    } catch (error) {
      return null   
    }
  },
  actualizarPluviometro: async (parent, {id_pluviometro, input}, {db}, info) => {
    // actualizar pluviometro
    const buscarPluviometro = await db.Pluviometros.findOne({ where: {id_pluviometro} })

    if(!buscarPluviometro) {
      throw new Error('No existe')
    }

    try {
      await buscarPluviometro.update(input, { where: {id_pluviometro} })
      return buscarPluviometro
    } catch (error) {
      return null  
    }
  },
  actualizarLluvia: async (parent, {id_lluvia, input}, {db}, info) => {
    // actualizar lluvia
    const buscarLluvia = await db.Lluvias.findOne({ where: {id_lluvia} })

    if(!buscarLluvia) {
      throw new Error('No existe')
    }

    try {
      await buscarLluvia.update(input, { where: {id_lluvia} })
      return buscarLluvia
    } catch (error) {
      return null  
    }
  },
  actualizarUsuario: async (parent, {id_usuario, input}, {db}, info) => {
    // actualizar email usuarios
    const {password} = input
    const buscarUser = await db.Usuarios.findOne({ where: {id_usuario} })

    if(!buscarUser) {
      throw new Error('No existe')
    }

    try {
      // hashear el password
      const salt = await bcryptjs.genSalt(10)
      input.password = await bcryptjs.hash(password, salt)

      await buscarUser.update(input, { where: {id_usuario} })
      return buscarUser
    } catch (error) {
      return null  
    }
  },
  terminarCorte: async (parent, {id_corte, input}, {db}, info) => {
    // verificar si existe
    const terminarCorte = await db.Cortes.findOne({ where: {id_corte} })

    if(!terminarCorte) {
      throw new Error('No existe')
    }

    try {
      await terminarCorte.update(input, { where: {id_corte} })
      return terminarCorte
    } catch (error) {
      return null
    }
  },
  borrarSuerte: async (parent, {id_suerte}, {db}, info) => {
    try {
      return await db.Suertes.destroy({
        where: {
          id_suerte
        }
      }).then(function(rows){
          if(rows === 1){
              return {
                  success: true
              };
          }
          return {
              success: false
          };
      }, function(err){
          console.log(err);
      }); 
    } catch (error) {
      console.log(error);
    }
  },
  eliminarTablon: async (parent, {id_tablon}, {db}, info) => {
    try {
      await db.Tablones.destroy({ where: {id_tablon} })
    } catch (error) {
      return null
    }
  } 
}
