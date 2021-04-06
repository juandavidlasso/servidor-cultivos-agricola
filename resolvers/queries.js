const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { QueryTypes, where } = require('sequelize')

module.exports= {
  obtenerUsuario: async (parent, {}, ctx, info) => {
    // console.log(ctx.me.usuario);
    
    return await ctx.me.usuario
    // if(!usuarioActual) {
    //   return null
    // }
    //console.log(usuarioActual)

    // obtener email actual del request del JWT
    //const email = db.Usuarios.findOne({ where: {email: usuarioActual.email}, attributes: ['email'] })

    //return email
  },
  // Listado de suertes
  obtenerSuertesRenovadas: async (parent, args, {db}, info) => {
    try {
      //return db.Suertes.findAll({where:{renovada:'SI'}, order:[ ['nombre', 'ASC'] + 0,['nombre', 'ASC'] ]}); 
      return await db.sequelize.query(`select id_suerte, nombre, area, variedad, zona, renovada, createdAt, updatedAt from suertes where renovada='SI' order by nombre + 0, nombre`, { type: QueryTypes.SELECT}); 
    } catch (error) {
      return null
    }
  },
  // Cortes renovados por cada suerte
  obtenerCortesRenovados: async (parent, {nombre}, {db}, info) => {
    try {
      return await db.Cortes.findAll({
        include:[{
          model:db.Suertes,
          as:'suertePadre',
          required: true,
          where:{
              nombre: nombre
          }}]        
      }); 
    } catch (error) {
      return null
    }
  },
  // obtenerSuertes: async (parent, args, {db}, info) => {
  //   try {
  //     return await db.Suertes.findAll()
  //   } catch (error) {
  //     return null
  //   } 
  // },
  // consulta cada suerte
  obtenerSuerte: async (parent, {id_suerte}, {db}, info) => {
    try {
      return await db.Suertes.findOne({ where: {id_suerte} })
    } catch (error) {
      return null     
    } 
  },
  // consulta numero de cortes de cada suerte
  obtenerCortesPorSuerte: async (parent, {id_suerte}, {db}, info) => {
    try {
      return await db.Cortes.count({ where: {suerte_id:id_suerte} })
    } catch (error) {
      return null    
    } 
  },
  // consulta cada corte
  obtenerCorte: async (parent, {id_corte}, {db}, info) => {
    try {
      return await db.Cortes.findOne({ where: {id_corte} })
    } catch (error) {
      return null    
    } 
  },
  // consulta labores de cada corte
  obtenerLaborPorCorte: async (parent, {id_corte}, {db}, info) => {
    try {
      return await db.Labores.findAll({ where: {corte_id:id_corte} })
    } catch (error) {
      return null    
    }
  },
  // consulta cada labor
  obtenerLabor: async (parent, {id_labor}, {db}, info) => {
    try {
      return await db.Labores.findOne({ where: {id_labor} })
    } catch (error) {
      return null    
    }
  },
  // consulta aplicaciones herbicidades de cada corte
  obtenerHerbicidasPorCorte: async (parent, {id_corte}, {db}, info) => {
    try {
      return await db.Aplicacion_herbicidas.findAll({ where: {corte_id:id_corte} })
    } catch (error) {
      return null   
    }
  },
  // consulta cada aplicacion herbicida
  obtenerAplicacionHerbicida: async (parent, {id_aphe}, {db}, info) => {
    try {
      return await db.Aplicacion_herbicidas.findOne({ where: {id_aphe} })
    } catch (error) {
      return null    
    }
  },
  // consulta tratamientos herbicidas por aplicacion herbicida
  obtenerTherbicidaPorAplicacion: async (parent, {id_aphe}, {db}, info) => {
    try {
      return await db.Tratamiento_herbicidas.findAll({ where: {aphe_id:id_aphe} })
    } catch (error) {
      return null    
    }
  },
  // consulta cada tratamiento herbicida
  obtenerTratamientoHerbicida: async (parent, {id_trahe}, {db}, info) => {
    try {
      return await db.Tratamiento_herbicidas.findOne({ where: {id_trahe} })
    } catch (error) {
      return null    
    }
  },
  // consulta aplicaciones fertilizantes de cada corte
  obtenerAPFEPorCorte: async (parent, {id_corte}, {db}, info) => {
    try {
      return await db.Aplicacion_fertilizantes.findAll({ where: {corte_id:id_corte} })
    } catch (error) {
      return null   
    }
  },
  // consulta cada aplicacion fertilizante
  obtenerAlicacionFertilizante: async (parent, {id_apfe}, {db}, info) => {
    try {
      return await db.Aplicacion_fertilizantes.findOne({ where: {id_apfe} })
    } catch (error) {
      return null    
    }
  },
  // consulta tratamiento fertilizante de cada aplicacion fertilizante
  obtenerTRFEPorAplicacion: async (parent, {id_apfe}, {db}, info) => {
    try {
      return await db.Tratamiento_fertilizantes.findAll({ where: {apfe_id:id_apfe} })
    } catch (error) {
      return null    
    }
  },
  // consulta cada tratamiento fertilizante
  obtenerTratamientoFertilizante: async (parent, {id_trafe}, {db}, info) => {
    try {
      return await db.Tratamiento_fertilizantes.findOne({ where: {id_trafe} })
    } catch (error) {
      return null    
    }
  },
  // consulta cosechas de cada corte
  obtenerCosechaPorCorte: async (root, {id_corte}, {db}, info) => {
    try {
      return await db.Cosechas.findAll({ where: {corte_id:id_corte} })
    } catch (error) {
      return null    
    }
  },
  // consulta cada cosecha
  obtenerCosecha: async (parent, {id_cosecha}, {db}, info) => {
    try {
      return await db.Cosechas.findOne({ where: {id_cosecha} })
    } catch (error) {
      return null     
    }
  },
  // consulta area de cada suerte sumando el area de los tablones de cada corte
  obtenerAreaSuerte: async (parent, {id_suerte}, {db}, info) => {
    try {
      return await db.Tablones.sum('Tablones.area', {
        include: [{
          model: db.Cortes,
          as: 'cortePapa',
          required: true,
          where: {
            activo: true
          },
          attributes: [],
          include: [{
            model: db.Suertes,
            as: 'suertePadre',
            required: true,
            where: {
              id_suerte
            },
            attributes: []
          }]
        }]
      })
    } catch (error) {
      return null     
    }
  },
  // consulta area de cada corte para calcular el tch y tchm
  obtenerAreaCorte: async (parent, {id_corte}, {db}, info) => {
    try {
      return await db.Tablones.sum('Tablones.area', {
        include: [{
          model: db.Cortes,
          as: 'cortePapa',
          required: true,
          where: {
            id_corte
          },
          attributes: [],
        }]
      })
    } catch (error) {
      return null     
    }
  },
  // consulta listado de pluviometros con sus respectivas lluvias
  obtenerPluviometrosYLluvias: async (parent, args, {db}, info) => {
    try {
      return await db.Pluviometros.findAll({
        include: [{
          model: db.Lluvias,
          as: 'listlluvias',
          required: true
        }],
        order: [
          [ {model: db.Lluvias, as: 'listlluvias'}, 'fecha', 'ASC' ]
        ]
      })
    } catch (error) {
      return null    
    }
  },
  // consulta listado de tablones de cada corte
  obtenerTablonesPorCorte: async (parent, {id_corte}, {db}, info) => {
    try {
      return await db.Tablones.findAll({ where: {corte_id: id_corte}, order:[['numero','ASC']] })
    } catch (error) {
      return null   
    }
  },
  // consulta cada tablon
  obtenerTablon: async (parent, {id_tablon}, {db}, info) => {
    try {
      return await db.Tablones.findOne({ where: {id_tablon} })
    } catch (error) {
      return null   
    }
  },
  // consulta cantidad de tablones de cada corte
  countTablonesPorSuerte: async (parent, {id_suerte}, {db}, info) => {
    try {
      return await db.Tablones.count({
        include: [{
          model: db.Cortes,
          as: 'cortePapa',
          required: true,
          where: {
            activo: true
          },
          attributes: [],
          include: [{
            model: db.Suertes,
            as: 'suertePadre',
            required: true,
            where: {
              id_suerte
            },
            attributes: []
          }]
        }]
      })
    } catch (error) {
      return null   
    }
  },
  obtenerCorteActual: async (parent, {id_suerte}, {db}, info) => {
    try {
      return await db.Cortes.findOne({
        where: {
          suerte_id: id_suerte,
          activo: true
        }
      })
    } catch (error) {
      return null    
    }
  },
  obtenerTratamientoPlagas: async (parent, args, {db}, info) => {
    try {
      return await db.Tratamiento_plagas.findAll()
    } catch (error) {
      return null    
    }
  },
  obtenerTratamientoPlaga: async (parent, {id_trapl}, {db}, info) => {
    try {
      return await db.Tratamiento_plagas.findOne({ where: {id_trapl} })
    } catch (error) {
      return null    
    }
  },
  obtenerAplicacionPlagas: async (parent, {id_corte, id_tablon, id_trapl}, {db}, info) => {
    try {
      return await db.Aplicacion_plagas.findOne({
        where: {
          corte_id: id_corte,
          tablon_id: id_tablon, 
          trapl_id: id_trapl
        }
      })
    } catch (error) {
      return null     
    }
  },
  obtenerAplicacionPlaga: async (parent, {id_apla}, {db}, info) => {
    try {
      return await db.Aplicacion_plagas.findOne({ where: {id_apla}
      })
    } catch (error) {
      return null   
    }
  },
  // area total de hectareas activas
  obtenerTotalHtaSuertes: async (parent, args, {db}, info) => {
    try {
      return await db.Tablones.sum('Tablones.area', {
        include: [{
          model: db.Cortes,
          as: 'cortePapa',
          required: true,
          where: {
            activo: true
          },
          attributes: []
        }]
      })
    } catch (error) {
      return null   
    }
  },
  consultaProntuario: async (parent, {nombre,inicial,final}, {db}, info) => {
    try {
      if(nombre.trim() !== ""){
        return await db.Suertes.count({
          where: {
            [Op.and]: [{nombre},{
              createdAt:{
                [Op.between]:[inicial,final]
              }
            }]
          }
        }).then(count=> {
          if(count!=0){
            return db.sequelize.query('select count(*) as conteo from `cosechas` c INNER JOIN `cortes` o ON o.id_corte=c.corte_id INNER JOIN `suertes` s ON s.id_suerte=o.suerte_id where s.nombre=:nombr and s.createdAt BETWEEN :inicia AND :fina', {
              replacements: {
                nombr:nombre, 
                inicia:inicial, 
                fina:final
              },
              type: QueryTypes.SELECT
            }).then( cuente => {
                if(cuente[0].conteo!=0){
                  return db.Cosechas.findAll({        
                    include:[{
                      model:db.Cortes,
                      as:'cortePadre',
                      required: true,
                      raw: true,
                      attributes: {
                        include: [[
                          db.sequelize.literal(`(SELECT SUM(area) FROM tablones WHERE corte_id=id_corte)`,),'area'
                        ]]
                      },
                      include:[{
                        model: db.Suertes,
                        as:'suertePadre',
                        required: true,
                        where: {
                          [Op.and]: [{nombre},{
                            createdAt:{
                              [Op.between]:[inicial,final]
                            }
                          }],          
                        }
                      }]  
                    }]
                  })
                }
              })
          }})
      } else {
        return db.Cosechas.findAll({
          include:[{
            model:db.Cortes,
            as:'cortePadre',
            required: true,
            raw: true,
            attributes: {
              include: [[
                db.sequelize.literal(`(SELECT SUM(area) FROM tablones WHERE corte_id=id_corte)`,),'area'
              ]]
            },
            include:[{
              model: db.Suertes,
              as:'suertePadre',
              required: true,
              where: {
                createdAt:{
                  [Op.between]:[inicial,final]
                }          
              }
            }]          
          }]
        });                        
      }
    } catch (error) {
      return null    
    }
  },
  obtenerEmail: async (parent, {email}, {db}, info) => {
    try {
      return await db.Usuarios.findOne({ where: {email} })
    } catch (error) {
      return null   
    }
  },
  // Listado de suertes y corte para el modal transferir informacion
  obtenerSuertesRenovadasYCortes: async (parent, args, {db}, info) => {
    try {
      return await db.Suertes.findAll({
        order: [
          [db.sequelize.literal(`nombre + 0, nombre`)]
        ],
        where: {
          renovada:'SI'
        },
        include: [{
          model: db.Cortes,
          as: 'listcortes',
          required: true
        }]
      }); 
    } catch (error) {
      return null
    }
  },
  // obtener suertes renovadas con listado de cortes y tablones para modal
  obtenerSuerteRenovadaCorteTablon: async (parent, args, {db}, info) => {
    try {
      return await db.Suertes.findAll({
        where: {
          renovada:'SI'
        },
        include: [{
          model: db.Cortes,
          as: 'listcortes',
          required: true,
          include: [{
            model: db.Tablones,
            as: 'listTablones',
            required: true
          }]
        }]
      }); 
    } catch (error) {
      return null
    }
  },
  // Suerte corte y tablon para modal de plagas
  obtenerSuerteCorteTablon: async (parent, args, {db}, info) => {
    try {
      return await db.Suertes.findAll({
        order: [
          [db.sequelize.literal(`nombre + 0, nombre`)]
        ],
        where: {
          renovada:'SI'
        },
        include: [{
          model: db.Cortes,
          as: 'listcortes',
          required: true,
          include: [{
            model: db.Tablones,
            as: 'listTablones',
            required: true
          }]
        }]
      })
    } catch (error) {
      return null
    }
  },
  // Listado de pluviometros
  obtenerPluviometros: async (parent, args, {db}, info) => {
    try {
      return await db.Pluviometros.findAll({ order: [['nombre', 'ASC']] })
    } catch (error) {
      return null
    }
  },
  // Listado lluvias por mes y año
  obtenerLluvias: async (parent, {fechanueva, id_pluviometro}, {db}, info) => {
    try {
      return await db.sequelize.query(`SELECT id_lluvia, cantidad, fecha FROM lluvias WHERE date_format(fecha, '%Y-%m') = :fechita AND pluviometro_id=:pluviometroid order by fecha ASC;`, {
        replacements: {
          fechita:fechanueva,
          pluviometroid:id_pluviometro
        },
        type: QueryTypes.SELECT
      })
      // return await db.sequelize.query(`SELECT id_lluvia, cantidad, fecha FROM lluvias WHERE date_format(fecha, '%Y-%m') = ${fechita} AND pluviometro_id=${id_pluviometro};`, { type: QueryTypes.SELECT})
    } catch (error) {
      return null
    }
  },
  // Listado lluvias por año
  obtenerLluviasAno: async (parent, {anofecha, id_pluviometro}, {db}, info) => {
    try {
      return await db.sequelize.query(`SELECT id_lluvia, SUM(cantidad) AS cantidad, date_format(fecha, '%M') AS fecha FROM lluvias WHERE date_format(fecha, '%Y') = :fechayear AND pluviometro_id=:pluviometroid GROUP BY date_format(fecha, '%m')`, {
        replacements: {
          fechayear:anofecha,
          pluviometroid:id_pluviometro
        },
        type: QueryTypes.SELECT
      })
    } catch (error) {
      return null
    }
  },
  // Listado lluvias actuales
  obtenerLluviasActuales: async (parent, {id_pluviometro}, {db}, info) => {
    try {
      return await db.sequelize.query(`SELECT id_lluvia, fecha, cantidad FROM Lluvias WHERE MONTH(fecha) = MONTH(NOW()) AND pluviometro_id=:id_pluviometro ORDER BY fecha ASC;`, {
        replacements: {
          id_pluviometro
        },
        type: QueryTypes.SELECT })
    } catch (error) {
      return null
    }
  },
  // Valor total Herbicidas
  obtenerValorTotalHerb: async (parent, {id_aphe}, {db}, info) => {
    try {
      return await db.Tratamiento_herbicidas.sum('Tratamiento_herbicidas.valor', {
        include: [{
          model: db.Aplicacion_herbicidas,
          as: 'aplicacionHPadre',
          required: true,
          where: {
            id_aphe
          }
        }]
      })
    } catch (error) {
      return null
    }
  },
  // Valor total fertilizantes
  obtenerValorTotalFerti: async (parent, {id_apfe}, {db}, info) => {
    try {
      return await db.Tratamiento_fertilizantes.sum('Tratamiento_fertilizantes.valor', {
        include: [{
          model: db.Aplicacion_fertilizantes,
          as: 'aplicacionFPadre',
          required: true,
          where: {
            id_apfe
          }
        }]
      })
    } catch (error) {
      return null
    }
  },
  // Nombre suerte para select
  obtenerNombreSuertesRenovadas: async (parent, args, {db}, info) => {
    try {
      //return db.Suertes.findAll({where:{renovada:'SI'}, order:[ ['nombre', 'ASC'] + 0,['nombre', 'ASC'] ]}); 
      return await db.sequelize.query(`select id_suerte, nombre from suertes where renovada='SI' order by nombre + 0, nombre`, { type: QueryTypes.SELECT}); 
    } catch (error) {
      return null
    }
  },
  // Obtener numero maximo de riego
  obtenerMaxRiego: async(parent, {id_corte}, {db}, info) => {
    try {
      return await db.Riegos.count({
        where: {
          corte_id:id_corte
        }
      }).then(count => {
        if(count!=0){
          return db.Riegos.max('num_riego', { where: {corte_id:id_corte} })
        } else {
          return 0
        }
      })
    } catch (error) {
      return null
    }
  },
  // obtener riegos de cada corte
  obtenerRiegosCorte: async (parent, {id_corte}, {db}, info) => {
    try {
      return await db.Riegos.findAll({ where: { corte_id:id_corte } })
    } catch (error) {
      return null
    }
  },
  obtenerDatosActuales: async (parent, args, {db}, info) => {
    try {
      return await db.Suertes.findAll({
        order: [
          [db.sequelize.literal(`nombre + 0, nombre`)]
        ],
        where: {
          renovada:'SI'
        },
        include: [{
          model: db.Cortes,
          as: 'listcortes',
          required: false,
          where: {
            fecha_corte: [
              db.sequelize.literal(`(SELECT MAX(fecha_corte) FROM Cortes as Corte GROUP BY suerte_id)`)
            ]
          },
          attributes: [
            'id_corte','numero','fecha_corte',
            [ db.sequelize.literal(`(SELECT SUM(area) FROM tablones WHERE corte_id=id_corte)`,),'area' ],
            [ db.sequelize.literal(`(SELECT MAX(numero) FROM cortes WHERE suerte_id=id_suerte)`,),'suerte_id' ],
            [ db.sequelize.literal(`(SELECT MAX(fecha_inicio) FROM cortes WHERE suerte_id=id_suerte)`,),'fecha_inicio' ]
          ],
          include: [{
            model: db.Cosechas,
            as: 'listcosechas',
            required: false
          }]
        }]
      })
      // return await db.Cortes.findAll({
      //   where: {
      //     fecha_corte: [
      //       db.sequelize.literal(`(SELECT MAX(fecha_corte) FROM Cortes as Corte GROUP BY suerte_id)`)
      //     ]
      //   },
      //   group:['suerte_id','suertePadre.nombre'],
      //   include:[{
      //     model: db.Suertes,
      //     as: 'suertePadre',
      //     required:true,
      //     attributes:[
      //       [
      //         db.sequelize.literal(`(SELECT MAX(id_suerte) FROM Suertes as Suerte WHERE Suerte.nombre=suertePadre.nombre)`,),'id_suerte'
      //       ],
      //       [
      //         db.sequelize.literal(`(SELECT variedad FROM Suertes as Suertecita WHERE Suertecita.id_suerte IN (SELECT MAX(id_suerte) FROM Suertes as Suerte WHERE Suerte.nombre=suertePadre.nombre))`,),'variedad'
      //       ], 
      //       [
      //         db.sequelize.literal(`(SELECT fecha_inicio FROM Cortes as Corteactual WHERE Corteactual.activo=true AND Corteactual.suerte_id IN (SELECT MAX(id_suerte) FROM Suertes as Suerte WHERE Suerte.nombre=suertePadre.nombre))`,),'zona'
      //       ],
      //       [
      //         db.sequelize.literal(`(SELECT numero FROM Cortes as Corteactual WHERE Corteactual.activo=true AND Corteactual.suerte_id IN (SELECT MAX(id_suerte) FROM Suertes as Suerte WHERE Suerte.nombre=suertePadre.nombre))`,),'renovada'
      //       ],
      //       [
      //         db.sequelize.literal(`(SELECT SUM(area) FROM tablones WHERE suerte_id=id_suerte)`,),'createdAt'
      //       ],
      //       [
      //         db.sequelize.literal(`(SELECT SUM(area) FROM tablones WHERE suerte_id IN (SELECT MAX(id_suerte) FROM Suertes as Suerte WHERE Suerte.nombre=suertePadre.nombre))`,),'area' 
      //       ],
      //       'nombre',          
      //     ],
      //     where:{
      //       id_suerte: [
      //         db.sequelize.literal(`(select max(suerte_id) from cortes c INNER JOIN suertes s ON s.id_suerte=c.suerte_id WHERE c.fecha_corte IN (select max(fecha_corte) from cortes group by suerte_id) group by s.nombre)`)
      //       ]
      //     },
      //   },
      //   {
      //     model: db.Cosechas,
      //     as: 'listcosechas',
      //     required:true,
      //   }]
      // })
    } catch(error) {
      return null
    }
  }
}
