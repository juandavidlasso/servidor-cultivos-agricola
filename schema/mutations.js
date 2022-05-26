const types = require('./types');

module.exports= `
  type Mutation {
    agregarUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput) : Token
    agregarSuerte(input: SuerteInput) : Suerte
    agregarSuerteRenovada(suerte: SuerteInput): Suerte
    agregarTablon(input: TablonInput, id_corte: Int) : Tablon
    agregarCorte(input: CorteInput) : Corte
    actualizarCorte(id_corte: Int, input: CorteInput) : Corte
    agregarLabor(input: [LaboresInput]) : Response
    agregarAplicacionHerbicida(input: AplicacionHerbicidasInput) : AplicacionHerbicidas
    agregarTratamientoHerbicidas(input: TratamientoHerbicidasInput) : TratamientoHerbicidas
    agregarAplicacionFertilizante(input: AplicacionFertilizantesInput) : AplicacionFertilizantes
    agregarTratamientoFertilizante(input: TratamientoFertilizantesInput) : TratamientoFertilizantes
    agregarPluviometro(input: PluviometroInput) : Pluviometro
    agregarLluvia(input: LluviaInput) : Lluvia
    agregarCosecha(input: CosechaInput) : Cosecha
    actualizarCosecha(id_cosecha: Int, input: CosechaInput) : Cosecha
    agregarAplicacionPlaga(input: [AplicacionPlagaInput]) : ResponseMessage
    agregarTratamientoPlaga(input: TratamientoPlagaInput) : TratamientoPlaga
    actualizarSuerte(id_suerte: Int, input: SuerteInput) : Suerte
    actualizarDatosCorte(id_corte: Int, input: CorteInput) : Corte
    actualizarLabor(id_labor: Int, input: LaboresInput) : Labores
    actualizarAPHE(id_aphe: Int, input: AplicacionHerbicidasInput) : AplicacionHerbicidas
    actualizarTRAHE(id_trahe: Int, input: TratamientoHerbicidasInput) : TratamientoHerbicidas
    actualizarAPFE(id_apfe: Int, input: AplicacionFertilizantesInput) : AplicacionFertilizantes
    actualizarTRAFE(id_trafe: Int, input: TratamientoFertilizantesInput) : TratamientoFertilizantes
    actualizarAPLA(id_apla: Int, input: AplicacionPlagaInput) : AplicacionPlaga
    actualizarTRAPL(id_trapl: Int, input: TratamientoPlagaInput) : TratamientoPlaga
    actualizarTablon(id_tablon: Int, input: TablonInput) : Tablon
    actualizarLluvia(id_lluvia: Int, input: LluviaInput) : Lluvia
    actualizarUsuario(id_usuario: Int, input: UsuarioInput) : Usuario
    terminarCorte(id_corte: Int, input: CorteInput) : Corte
    borrarSuerte(id_suerte: Int!) : Response
    eliminarTablon(id_tablon: Int) : Response
    eliminarLabor(id_labor: Int) : Response
    eliminarAphe(id_aphe: Int) : Response
    eliminarTrahe(id_trahe: Int) : Response
    eliminarApfe(id_apfe: Int) : Response
    eliminarTrafe(id_trafe: Int) : Response
    eliminarApla(id_apla: Int) : Response
    agregarRiego(input: RiegoInput) : Riego
    agregarAplicacionRiego(id_riego: Int, id_tablon: Int, input: AplicacionRiegoInput) : AplicacionRiego
    eliminarLluvia(id_lluvia: Int) : Response
    eliminarRiego(id_riego: Int) : Response
    actualizarRiego(id_riego: Int, input: RiegoInput) : Riego
    resetPassword(email: String) : Response
    enviarAlertas(input: [alertaMensajeInput]) : ResponseMessage
    agregarMaquinaria(input: MaquinariaInput) : Maquinaria
    agregarInsumo(input: InsumoInput) : Insumo
    agregarMantenimiento(input: [MantenimientoInput]) : Response
    enviarInformeCorreo(id_corte: Int, numero: Int, nombreSuerte: Int, area: Float, email: String, asunto: String, codigo: Int) : ResponseMessage
  }
`
