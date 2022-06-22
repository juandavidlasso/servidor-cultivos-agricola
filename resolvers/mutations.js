const bcryptjs = require('bcryptjs')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
// const pdf = require('html-pdf')
const xl = require('excel4node')
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
      return error
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
      return error    
    }
  },
  agregarSuerteRenovada: async (parent, {suerte}, {db}, info) => {
    try {
      return await db.Suertes.count({
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
      return error
    }  
  },
  agregarTablon: async (parent, {input, id_corte}, {db}, info) => {
    // revisar si hay tablon repetido
    const existeTablon = await db.Tablones.findOne({
      where: {
        numero: input.numero,
        corte_id: id_corte
      }
    })

    if(existeTablon) {
      throw new Error(`El tablón ${input.numero} ya esta registrado.`)
    }

    // crear el tablon
    try {
      return await db.Tablones.create(input)
    } catch (error) {
      return error     
    }
  },
  agregarCorte: async (parent, {input}, {db}, info) => {
    // crear corte
    try {
      return await db.Cortes.create(input)
    } catch (error) {
      return error    
    }
  },
  actualizarCorte: async (parent, {id_corte, input}, {db}, info) => {
    // actualizar corte
    const corte = await db.Cortes.findOne({ where: {id_corte} })

    if(!corte) {
      throw new Error('No existe')
    }
    
    try {
      await corte.update(input, { where:{id_corte} })
      return corte
    } catch (error) {
      return error    
    }
  },
  agregarLabor: async (parent, {input}, {db}, info) => {
    // crear labor
    try {
      for (let i = 0; i < input.length; i++) {
        await db.Labores.bulkCreate([input[i]])
      }
    } catch (error) {
      return error   
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
      return error    
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
      return error     
    }
  },
  agregarAplicacionFertilizante: async (parent, {input}, {db}, info) => {
    // crear aplicacion fertilizante
    try {
      return await db.Aplicacion_fertilizantes.create(input)
    } catch (error) {
      return error    
    }
  },
  agregarTratamientoFertilizante: async (parent, {input}, {db}, info) => {
    // crear tratamiento fertilizante
    try {
      return await db.Tratamiento_fertilizantes.create(input)
    } catch (error) {
      return error    
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
      return error   
    }
  },
  agregarLluvia: async (parent, {input}, {db}, info) => {
    // crear lluvia
    try {
      return await db.Lluvias.create(input)
    } catch (error) {
      return error   
    }
  },
  agregarCosecha: async (root, {input}, {db}, info) => {
    // crear cosecha
    try {
      return await db.Cosechas.create(input)
    } catch (error) {
      return error          
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
      return error   
    }
  },
  agregarAplicacionPlaga: async (parent, {input}, {db}, info) => {
    // crear aplicacion plaga
    try {
      for (let i = 0; i < input.length; i++) {
        await db.Aplicacion_plagas.bulkCreate([input[i]])
      }
      
      return {
        success: true,
        message: 'La aplicación se registró correctamente en los tablones seleccionados!'
      }
      // return await db.Aplicacion_plagas.create(input)
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  },
  agregarTratamientoPlaga: async (parent, {input}, {db}, info) => {
    // crear tratamiento plaga
    try {
      return await db.Tratamiento_plagas.create(input)
    } catch (error) {
      return error    
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
      return error
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
      return error    
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
      return error    
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
      return error    
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
      return error    
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
      return error    
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
      return error     
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
      return error    
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
      return error    
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
      return error   
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
      return error  
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
      return error  
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
      return error
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
          return null
      }); 
    } catch (error) {
      return error
    }
  },
  eliminarTablon: async (parent, {id_tablon}, {db}, info) => {
    try {
      await db.Tablones.destroy({ where: {id_tablon} })
    } catch (error) {
      return error
    }
  },
  // Eliminar labor
  eliminarLabor: async (parent, {id_labor}, {db}, info) => {
    // busco si existe la labor
    const silabor = await db.Labores.findOne({ where: id_labor })

    if(!silabor) throw new Error('No existe')

    try {
      return await silabor.destroy()
    } catch (error) {
      return error
    }
  },
  // Eliminar aplicacion herbicida
  eliminarAphe: async (parent, {id_aphe}, {db}, info) => {
    // busco si existe la labor
    const siaphe = await db.Aplicacion_herbicidas.findOne({ where: id_aphe })

    if(!siaphe) throw new Error('No existe')

    try {
      return await siaphe.destroy()
    } catch (error) {
      return error
    }
  },
  // Eliminar tratamiento herbicida
  eliminarTrahe: async (parent, {id_trahe}, {db}, info) => {
    // busco si existe la labor
    const sitrahe = await db.Tratamiento_herbicidas.findOne({ where: id_trahe })

    if(!sitrahe) throw new Error('No existe')

    try {
      return await sitrahe.destroy()
    } catch (error) {
      return error
    }
  },
  // Eliminar aplicacion fertilizante
  eliminarApfe: async (parent, {id_apfe}, {db}, info) => {
    // busco si existe la labor
    const siapfe = await db.Aplicacion_fertilizantes.findOne({ where: id_apfe })

    if(!siapfe) throw new Error('No existe')

    try {
      return await siapfe.destroy()
    } catch (error) {
      return error
    }
  },
  // Eliminar tratamiento herbicida
  eliminarTrafe: async (parent, {id_trafe}, {db}, info) => {
    // busco si existe la labor
    const sitrafe = await db.Tratamiento_fertilizantes.findOne({ where: id_trafe })

    if(!sitrafe) throw new Error('No existe')

    try {
      return await sitrafe.destroy()
    } catch (error) {
      return error
    }
  },
  // Eliminar aplicacion plaga
  eliminarApla: async (parent, {id_apla}, {db}, info) => {
    // busco si existe la labor
    const siapla = await db.Aplicacion_plagas.findOne({ where: id_apla })

    if(!siapla) throw new Error('No existe')

    try {
      return await siapla.destroy()
    } catch (error) {
      return error
    }
  },
  // Agregar riego con fecha y numero de riego
  agregarRiego: async (parent, {input}, {db}, info) => {
    try {
      return await db.Riegos.create(input)
    } catch (error) {
      return error
    }
  },
  // Agregar aplicacion riego a un riego y un tablon id
  agregarAplicacionRiego: async (parent, {id_riego, id_tablon, input}, {db}, info) => {
    // busco si ese tablon ya tiene aplicacion en ese riego
    const siAplicacionRiego = await db.Aplicacion_riegos.findOne({
      where: {
        riego_id: id_riego,
        tablon_id: id_tablon
      }
    })

    if(siAplicacionRiego) throw new Error('El tablón ya tiene aplicación para este riego.')

    try {
      return await db.Aplicacion_riegos.create(input)
    } catch (error) {
      return error
    }
  },
  // Eliminar lluvia
  eliminarLluvia: async (parent, {id_lluvia}, {db}, info) => {
    // busco si existe la lluvia
    const silluvia = await db.Lluvias.findOne({ where: id_lluvia })

    if(!silluvia) throw new Error('No existe')
    try {
      return await silluvia.destroy()
    } catch (error) {
      return error
    }
  },
  // Eliminar Riego
  eliminarRiego: async (parent, {id_riego}, {db}, info) => {
    // busco si existe el riego
    const siriego = await db.Riegos.findOne({ where: id_riego })

    if(!siriego) throw new Error('No existe')
    try {
      return await siriego.destroy()
    } catch (error) {
      return error
    }    
  },
  // editar fecha de riego
  actualizarRiego: async (parent, {id_riego, input}, {db}, info) => {
    // busco si existe el riego
    const siApRiego = await db.Riegos.findOne({ where: id_riego })

    if(!siApRiego) throw new Error('No existe')

    try {
      await siApRiego.update(input, { where: {id_riego} })
      return siApRiego
    } catch (error) {
      return error
    }
  },
  // Resetear password
  resetPassword: async (parent, {email}, {db}, info) => {
    // consulto si existe el usuario
    const existeUsu = await db.Usuarios.findOne({ where: {email} })

    if(!existeUsu) throw new Error(`No existe un usuario registrado con este correo electrónico.`)

    // si existe genero codigo
    const code = Math.random().toString(36).substring(2,15)

    // contenido html del correo
    const contentHTML = `
      <div style="padding: 1px 1px; max-width: 600px; margin: auto;">
        <div style="padding: 15px 25px; background-color: #000; height: 100px;">
          <div style="padding: 3px; background-color: #ffffff; height: 92px; text-align: center;">
            <img title="logo" src="https://cliente-agricola.vercel.app/static/media/logo.e11f10d35a627b5c5978.png" alt="button" width="90" />
          </div>
        </div>
      </div>
      
      <div style="padding: 10px 15px;">&nbsp;</div>
      <div style="padding: 10px 15px;">
        <span style="font-size: 12pt; font-family: georgia, palatino, serif; color: #34495e;">Hemos recibido su solicitud para reestablecer su contrase&ntilde;a, por favor ingrese el siguiente c&oacute;digo en la aplicaci&oacute;n:</span>
      </div>
      
      <div style="padding: 10px 15px;">
        <p style="text-align: center;"><span style="font-size: 14pt;"><strong>${code}</strong></span></p>
        <p style="text-align: center;">&nbsp;</p>
        <p style="text-align: left;"><span style="font-size: 12pt; font-family: georgia, palatino, serif; color: #34495e;"><strong>Este es un correo autom&aacute;tico, por favor no responder.</strong></span></p>
      </div>
      <hr />
      <div style="background-color: #2e3032; padding: 10px 15px;">
        <p><span style="font-size: 12pt; font-family: georgia, palatino, serif; color: #ffffff;"><strong>Agr&iacute;cola L&amp;M S.A.S.</strong></span></p>
        <p style="text-align: center;"><span style="font-size: 10pt; font-family: georgia, palatino, serif; color: #ffffff;"><strong>Cali, Valle del Cauca</strong></span></p>
        <p style="text-align: center;"><span style="font-size: 10pt; font-family: georgia, palatino, serif; color: #ffffff;"><strong>Colombia</strong></span></p>
      <hr />
        <p><span style="font-size: 12pt; font-family: georgia, palatino, serif; color: #ffffff;">Aplicaci&oacute;n desarrollada por <span style="color: #ced4d9;"><strong>GLOBAL DATA SYSTEM</strong></span></span></p>
        <p>&nbsp;</p>
        <p><span style="font-size: 12pt; font-family: georgia, palatino, serif;"><span style="color: #ffffff;">Si tiene alguna duda comuniquese con </span><span style="color: #000080;">solucionesgdsystem@gmail.com</span></span></p>
      </div>
    `;

    // credenciales del servicio de google apis
    const CLIENT_ID = "63187787153-q4vqp5aer4248i3mofqf6q7h4j8rmogg.apps.googleusercontent.com"
    const CLIENT_SECRET = "t6jAH4WMazKI3HJud18sIySt"
    const REDIRECT_URI = "https://developers.google.com/oauthplayground"
    const REFRESH_TOKEN = "1//04B4jrtb9vMOsCgYIARAAGAQSNwF-L9Ira5IpWlEJCU00Ax67uCcPpL7VzDa1XpUDVMom9h0m40m9DDiIxHlLEwPCxXuye5sv6xU"
    
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

    oAuth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN
    })

    // funcion para enviar el correo
    async function sendMail(){
      try {
        const getAccessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: "solucionesgdsystem@gmail.com",
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: getAccessToken
          },
          tls:{
            rejectUnauthorized: false
          }
        })
        const mailOptions = {
          from: "Soporte Agrícola <solucionesgdsystem@gmail.com>",
          to: email,
          subject: "Restaurar Contrasena",
          html: contentHTML
        }

        const result = await transport.sendMail(mailOptions)

        return result
      } catch (error) {
        return error
      }
    }

    // envio el email
    sendMail()
      .then(async () => {
        // actualizo codigo del usuario
        await existeUsu.update({
          codigo: code,
          where: {email}
        })
        return existeUsu
      })
      .catch((error) => error)
  },
  // Correo de alertas de aplicaciones
  enviarAlertas: async (parent, {input}, {db}, info) => {
    try {
      // contenido html del correo
      const contentHTML = `
        <div style="padding: 1px 1px; max-width: 600px; margin: auto;">
          <div style="padding: 15px 25px; background-color: #000; height: 100px;">
            <div style="padding: 3px; background-color: #ffffff; height: 92px; text-align: center;">
              <img title="logo" src="https://cliente-agricola.vercel.app/static/media/logo.e11f10d35a627b5c5978.png" alt="button" width="90" />
            </div>
          </div>
        </div>
        
        <div style="padding: 10px 15px;">&nbsp;</div>
        <div style="padding: 10px 15px;">
          <p style="font-size: 16pt; font-family: georgia, palatino, serif; color: #B03A2E; text-align: center;">Recordatorio</p>
          <p style="text-align: left;"><span style="font-size: 14pt;">Hoy se cumple la fecha para las siguientes aplicaciones de productos:</span></p>
        </div>
        
        <div style="padding: 10px 15px;">
          ${input.length === 0 ?
            `<p style="text-align: left;"><span style="font-size: 14pt;"><strong>No hay datos</strong></span></p>`
          :
            input.map(alerta => {
              const {suerte, mensaje} = alerta
              return (
                `<p style="text-align: left;"><span style="font-size: 14pt;"><strong>Suerte ${suerte}</strong></span></p>
                <p style="text-align: left;"><span style="font-size: 12pt;">${mensaje}</span></p>`
              )
            })
          }
          <p style="text-align: center;">&nbsp;</p>
          <p style="text-align: left;"><span style="font-size: 12pt; font-family: georgia, palatino, serif; color: #34495e;"><strong>Este es un correo autom&aacute;tico, por favor no responder.</strong></span></p>
        </div>
        <hr />
        <div style="background-color: #2e3032; padding: 10px 15px;">
          <p><span style="font-size: 12pt; font-family: georgia, palatino, serif; color: #ffffff;"><strong>Agr&iacute;cola L&amp;M S.A.S.</strong></span></p>
          <p style="text-align: center;"><span style="font-size: 10pt; font-family: georgia, palatino, serif; color: #ffffff;"><strong>Cali, Valle del Cauca</strong></span></p>
          <p style="text-align: center;"><span style="font-size: 10pt; font-family: georgia, palatino, serif; color: #ffffff;"><strong>Colombia</strong></span></p>
        <hr />
          <p><span style="font-size: 12pt; font-family: georgia, palatino, serif; color: #ffffff;">Aplicaci&oacute;n desarrollada por <span style="color: #ced4d9;"><strong>GLOBAL DATA SYSTEM</strong></span></span></p>
          <p>&nbsp;</p>
          <p><span style="font-size: 12pt; font-family: georgia, palatino, serif;"><span style="color: #ffffff;">Si tiene alguna duda comuniquese con </span><span style="color: #000080;">solucionesgdsystem@gmail.com</span></span></p>
        </div>
      `;

      // credenciales del servicio de google apis
      const CLIENT_ID = "617673617796-t6up0ufq0pvpdfh746gjn6o3308ujmmj.apps.googleusercontent.com"
      const CLIENT_SECRET = "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"
      const REDIRECT_URI = "https://developers.google.com/oauthplayground"
      const REFRESH_TOKEN = "1//04fBSGHbgiGZACgYIARAAGAQSNwF-L9IrISqn2YzlmUTQgfcR_S0s4cA2bgOarwqyuPTYjPoci934JDQLJddsbJpnEk4_xmwYWZo"
      
      const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

      oAuth2Client.setCredentials({
        refresh_token: REFRESH_TOKEN
      })

      // Variable para validar si envia o no correo
      let valido
      let msj

      // funcion para enviar el correo
      async function sendMail(){
        try {
          const getAccessToken = await oAuth2Client.getAccessToken()

          const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: "solucionesgdsystem@gmail.com",
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: getAccessToken
            },
            tls:{
              rejectUnauthorized: false
            }
          })
          const mailOptions = {
            from: "Soporte Agrícola <solucionesgdsystem@gmail.com>",
            to: 'campo@agricolalm.com, haciendasantaelena@hotmail.com',
            subject: "Recordatorio aplicación productos",
            html: contentHTML
          }

          const result = await transport.sendMail(mailOptions)

          return result
        } catch (error) {
          return error
        }
      }

      // envio el email
      await sendMail().then((result) => {
        const status = result.response.status
        const acept = result.accepted

        // Valido si envio
        if(acept !== undefined) {
          valido = true,
          msj = 'Las alertas se enviaron con éxito al correo.'
        }

        // Valido si hay error al enviar
        if(status !== undefined) {
          valido = false
          msj = 'Ocurrio un error al intentar enviar las alertas al correo.'
        }

        return {
          valido,
          msj
        }
      })

      // Retorno mensaje
      return {
        success: valido,
        message: msj
      }
      
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  },
  // MODULO DE MAQUINARIAS ----------------------------------------------------------------
  // Crear maquinaria
  agregarMaquinaria: async (parent, {input}, {db}, info) => {
    try {
      return await db.Maquinarias.create(input)
    } catch (error) {
      return error    
    }
  },
  // Crear insumo
  agregarInsumo: async (parent, {input}, {db}, info) => {
    try {
      return await db.Insumos.create(input)
    } catch (error) {
      return error    
    }
  },
  // Agregar mantenimiento
  agregarMantenimiento: async (parent, {input}, {db}, info) => {
    for (let i = 0; i < input.length; i++) {
      if(input[i].fecha === '' || input[i].horaCambio === '' || input[i].tipoCambio === '' ||
        input[i].cantidad === '' || input[i].insumoId === '' || input[i].maquinariaId === '') {
        throw new Error('Debe ingresar todos los datos.')
      }
    }

    try {
      for (let i = 0; i < input.length; i++) {
        await db.Mantenimientos.bulkCreate([input[i]])
      }
    } catch (error) {
      return error    
    }
  },
  // Agregar aplicacion mantenimiento
  agregarAplicacionMantenimiento: async (pareent, {input}, {db}, info) => {
    try {
      return await db.Aplicacion_mantenimientos.create(input)
    } catch (error) {
      return error    
    }
  },
  // Edita aplicacion mantenimiento
  editarAplicacionMantenimiento: async (parent, {idApMant, input}, {db}, info) => {
    // Busco la aplicacion mantenimiento
    const aplMantenimiento = await db.Aplicacion_mantenimientos.findOne({ where: {idApMant} })

    if(!aplMantenimiento) {
      throw new Error ('No existe')
    }

    try {
      await aplMantenimiento.update(input, {where: {idApMant}} )
      return aplMantenimiento
    } catch (error) {
      return error   
    }
  },
  // Eliminar aplicacion mantenimiento
  eliminarAplicacionMantenimiento: async (parent, {idApMant}, {db}, info) => {
    // busco si existe la labor
    const aplMant = await db.Aplicacion_mantenimientos.findOne({ where: idApMant })
  
    if(!aplMant) throw new Error('No existe')
  
    try {
      return await aplMant.destroy()
    } catch (error) {
      return error
    }
  },
  // Eliminar mantenimiento lista
  eliminarListaMantenimiento: async (parent, {idMantenimiento}, {db}, info) => {
    // busco el lista mantenimiento
    const listMantenimiento = await db.Mantenimientos.findOne({ where: idMantenimiento })

    if (!listMantenimiento) throw new Error('No Existe')

    try {
      return await listMantenimiento.destroy()
    } catch (error) {
      return error
    }
  },
  // Generar PDF y enviar por correo
  enviarInformeCorreo: async (parent, {input, email, asunto}, {db}, info) => {

    let result = input.reduce((acc,cur) => {
      let { suerte, area, corte, ...rest } = cur;
      let ex = acc.find(x => x.suerte === suerte);
      if(!ex){
         ex = { suerte, area, corte, tratamientos: [] };
         acc.push(ex);
      }
      ex.tratamientos.push(rest);
      return acc;
    }, [])

    // Creo el libro Excel
    let wb = new xl.Workbook()
    // Creo hoja de excel
    let ws = wb.addWorksheet('Hoja1');
    // Estilos
    let styleHeader = wb.createStyle({
      fill: {
        type: 'pattern',
        patternType: 'solid',
        bgColor: '#F1A399',
        fgColor: '#F1A399'
      },
      font: {
        size: 11,
        color: '#000000',
        bold: true
      }
    })
    let styleHeaderE = wb.createStyle({
      font: {
        size: 11,
        color: '#000000',
        bold: true
      }
    })
    let styleOptionH = wb.createStyle({
      fill: {
        type: 'pattern',
        patternType: 'solid',
        bgColor: '#C6E0B4',
        fgColor: '#C6E0B4'
      },
      font: {
        size: 11,
        color: '#000000'
      }
    })
    let styleOptionHC = wb.createStyle({
      fill: {
        type: 'pattern',
        patternType: 'solid',
        bgColor: '#C6E0B4',
        fgColor: '#C6E0B4'
      },
      font: {
        size: 11,
        color: '#000000'
      },
      alignment: {
        horizontal: ['center']
      }
    })
    let styleOptionF = wb.createStyle({
      fill: {
        type: 'pattern',
        patternType: 'solid',
        bgColor: '#BDD7EE',
        fgColor: '#BDD7EE'
      },
      font: {
        size: 11,
        color: '#000000'
      }
    })
    let styleOptionFC = wb.createStyle({
      fill: {
        type: 'pattern',
        patternType: 'solid',
        bgColor: '#BDD7EE',
        fgColor: '#BDD7EE'
      },
      font: {
        size: 11,
        color: '#000000'
      },
      alignment: {
        horizontal: ['center']
      }
    })

    // Recorro array para crear Excel
    let pos = 1
    for (let index = 0; index < result.length; index++) {
      // Celdas de encabezado
      ws.cell(pos,1).string('HACIENDA').style(styleHeader)
      ws.cell(pos,2).string('SUERTE').style(styleHeader)
      ws.cell(pos,3).string('AREA').style(styleHeader)
      ws.cell(pos,4).string('CORTE #').style(styleHeader)
      ws.cell(pos,5).string('PRODUCTO').style(styleHeader)
      ws.cell(pos,6).string('DOSIS').style(styleHeader)
      ws.cell(pos,7).string('UNIDAD').style(styleHeader)
      ws.cell(pos,8).string('CANTIDAD X HTA').style(styleHeader)
      ws.cell(pos,9).string('TRATAMIENTO').style(styleHeader)

      // Width
      ws.column(1).setWidth(20);
      ws.column(5).setWidth(20);
      ws.column(8).setWidth(20);
      ws.column(9).setWidth(20);

      // Aumento pos para bajar de la cabecera
      pos++
      // Informacion data
      ws.cell(pos,1).string('STA HELENA').style(styleHeaderE)
      ws.cell(pos,2).string( result[index].suerte ).style(styleHeaderE)
      ws.cell(pos,3).number( result[index].area ).style(styleHeaderE)
      ws.cell(pos,4).number( result[index].corte ).style(styleHeaderE)

      for (let i = 0; i < result[index].tratamientos.length; i++) {
        // Productos herbicidas y fertilizantes
        let cantidad = (result[index].area * result[index].tratamientos[i].dosis).toFixed(0)
        let cantXHta = Number(cantidad)
        ws.cell(pos,5).string( (result[index].tratamientos[i].producto).toUpperCase() ).style( result[index].tratamientos[i].identificador === 1 ? styleOptionH : styleOptionF )
        ws.cell(pos,6).number( (result[index].tratamientos[i].dosis) ).style( result[index].tratamientos[i].identificador === 1 ? styleOptionHC : styleOptionFC )
        ws.cell(pos,7).string( (result[index].tratamientos[i].presentacion).toUpperCase() ).style( result[index].tratamientos[i].identificador === 1 ? styleOptionHC : styleOptionFC )
        ws.cell(pos,8).number( (cantXHta) ).style( result[index].tratamientos[i].identificador === 1 ? styleOptionHC : styleOptionFC )
        ws.cell(pos,9).string( (result[index].tratamientos[i].identificador === 1 ? 'HERBICIDAS' : 'FERTILIZANTES' ) ).style( result[index].tratamientos[i].identificador === 1 ? styleOptionH : styleOptionF )

        pos++
      }

      pos += 3
    }


    // credenciales del servicio de google apis
    const CLIENT_ID = "617673617796-t6up0ufq0pvpdfh746gjn6o3308ujmmj.apps.googleusercontent.com"
    const CLIENT_SECRET = "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"
    const REDIRECT_URI = "https://developers.google.com/oauthplayground"
    const REFRESH_TOKEN = "1//04fBSGHbgiGZACgYIARAAGAQSNwF-L9IrISqn2YzlmUTQgfcR_S0s4cA2bgOarwqyuPTYjPoci934JDQLJddsbJpnEk4_xmwYWZo"
    
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

    oAuth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN
    })

    // funcion para enviar el correo
    async function sendMail(file) {
      const getAccessToken = await oAuth2Client.getAccessToken()

      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "solucionesgdsystem@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: getAccessToken
        },
        tls:{
          rejectUnauthorized: false
        }
      })
      const mailOptions = {
        from: "Soporte Agrícola <solucionesgdsystem@gmail.com>",
        to: email,
        subject: asunto,
        attachments: [
          { filename: 'Informe.xlsx', content: file, contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
        ]
      }

      const result = await transport.sendMail(mailOptions)

      return result
    }

    let suc
    let mesg
    
    try {
      await wb.writeToBuffer().then( async function(buffer) {
        await sendMail(buffer).then( async (res) => {
          if (!res.accepted[0]) {
            suc =  false,
            mesg = 'El informe no se pudo enviar, intente de nuevo en unos minutos'
          } else {
            suc = true,
            mesg = 'El informe se envió exitosamente'
          }
        });

        return {
          suc,
          mesg
        }

      })

      return {
        success: suc,
        message: mesg
      }
    } catch (error) {
      return error
    }
  }
}
