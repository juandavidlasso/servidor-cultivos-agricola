const types = require('./types');

module.exports= `
  type Query {
    obtenerUsuario: Usuario
    obtenerSuertesRenovadas: [Suerte]
    obtenerCortesRenovados(nombre: String): [Corte]
    obtenerSuerte(id_suerte: Int) : Suerte
    obtenerCortesPorSuerte(id_suerte: Int) : Int
    obtenerCorte(id_corte: Int) : Corte
    obtenerLaborPorCorte(id_corte: Int) : [Labores]
    obtenerHerbicidasPorCorte(id_corte: Int) : [AplicacionHerbicidas]
    obtenerTherbicidaPorAplicacion(id_aphe: Int) : [TratamientoHerbicidas]
    obtenerAPFEPorCorte(id_corte: Int) : [AplicacionFertilizantes]
    obtenerTRFEPorAplicacion(id_apfe: Int) : [TratamientoFertilizantes]
    obtenerCosechaPorCorte(id_corte: Int) : [Cosecha]
    obtenerCosecha(id_cosecha: Int) : Cosecha
    obtenerAreaSuerte(id_suerte: Int) : Float
    obtenerAreaCorte(id_corte: Int) : Float
    obtenerPluviometrosYLluvias: [Pluviometro]
    obtenerTablonesPorCorte(id_corte: Int) : [Tablon]
    obtenerTablon(id_tablon: Int) : Tablon
    countTablonesPorSuerte(id_suerte: Int) : Int
    obtenerCorteActual(id_suerte: Int) : Corte
    obtenerTratamientoPlagas: [TratamientoPlaga]
    obtenerAplicacionPlagas(id_corte: Int, id_tablon: Int, id_trapl: Int) : AplicacionPlaga
    obtenerTotalHtaSuertes : Float
    consultaProntuario(nombre: String, inicial: String, final: String) : [Cosecha]
    obtenerUsuarioCodigo(codigo: String) : Usuario
    obtenerLabor(id_labor: Int) : Labores
    obtenerAplicacionHerbicida(id_aphe: Int) : AplicacionHerbicidas
    obtenerTratamientoHerbicida(id_trahe: Int) : TratamientoHerbicidas
    obtenerAlicacionFertilizante(id_apfe: Int) : AplicacionFertilizantes
    obtenerTratamientoFertilizante(id_trafe: Int) : TratamientoFertilizantes
    obtenerTratamientoPlaga(id_trapl: Int): TratamientoPlaga
    obtenerAplicacionPlaga(id_apla: Int) : AplicacionPlaga
    obtenerSuertesRenovadasYCortes: [Suerte]
    obtenerSuerteRenovadaCorteTablon: [Suerte]
    obtenerSuerteCorteTablon: [Suerte]
    obtenerPluviometros: [Pluviometro]
    consultarLluvias(inicial: Int, final: Int, ano: Int, id_pluviometro: Int) : [Lluvia]
    obtenerValorTotalHerb(id_aphe: Int): Float
    obtenerValorTotalFerti(id_apfe: Int): Float
    obtenerNombreSuertesRenovadas: [Suerte]
    obtenerMaxRiego(id_corte: Int): Int
    obtenerRiegosCorte(id_corte: Int) : [Riego]
    obtenerDatosActuales(nombres: String): [Corte]
    obtenerResumenPluviometro: [Pluviometro]
    obtenerResumenAno(year: Int): [Lluvia]
    obtenerAplicacionRiegos(id_riego: Int) : [Tablon]
    obtenerTotalLluviaActualPluviometro(id_pluviometro: Int) : Float
    obtenerSuertesAsociadas : [Pluviometro]
    obtenerPromedioLluvias(time: Int) : [Lluvia]
    obtenerTotalPluviometros : Int
    obtenerResumenAnoPluviometro(year: Int): [Lluvia]
  }
`
