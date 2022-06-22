module.exports=`
  type Usuario {
    id_usuario: Int
    nombre: String
    apellido: String
    email: String
    password: String
    rol: Int
    codigo: String
  }
  type Response {
    success: Boolean
  }

  input UsuarioInput {
    id_usuario: Int
    nombre: String!
    apellido: String!
    email: String!
    password: String!
    rol: Int!
  }

  input AutenticarInput {
    email: String!
    password: String!
  }

  type Token {
    token: String!
  }

  type Suerte {
    id_suerte: Int
    nombre: String
    area: Float
    variedad: String
    zona: String
    renovada: String
    createdAt: String
    listcortes: [Corte]
  }

  input SuerteInput {
    id_suerte: Int
    nombre: String!
    variedad: String!
    zona: String!
    renovada: String
  }

  type Tablon {
    id_tablon: Int
    numero: Int
    area: Float
    estado: Boolean
    corte_id: Int
    cortePapa: Corte
  }

  input TablonInput {
    id_tablon: Int
    numero: Int!
    area: Float!
    estado: Boolean!
    corte_id: Int!
  }

  type Corte {
    id_corte: Int
    numero: Int
    fecha_siembra: String
    fecha_inicio: String
    fecha_corte: String
    activo: Boolean
    area: Float
    suerte_id: Int
    estado: Boolean
    listcosechas: [Cosecha]
    listTablones: [Tablon]
    suertePadre: Suerte
    listAplicacionHerbicida: [AplicacionHerbicidas]
    listAplicacionFertilizante: [AplicacionFertilizantes]
  }

  input CorteInput {
    id_corte: Int
    numero: Int!
    fecha_siembra: String!
    fecha_inicio: String!
    fecha_corte: String
    activo: Boolean
    estado: Boolean!
    suerte_id: Int!
  }

  type Labores {
    id_labor: Int
    fecha: String
    actividad: String
    equipo: String
    estado: String
    pases: Int
    aplico: String
    costo: Float
    nota: String
    corte_id: Int
  }

  input LaboresInput {
    id_labor: Int
    fecha: String!
    actividad: String!
    equipo: String!
    estado: String
    pases: Int
    aplico: String
    costo: Float
    nota: String
    corte_id: Int!
  }

  type AplicacionHerbicidas {
    id_aphe: Int
    fecha: String
    tipo: String
    corte_id: Int
    listTratamientoHerbicida: [TratamientoHerbicidas]
  }

  input AplicacionHerbicidasInput {
    id_aphe: Int
    fecha: String!
    tipo: String!
    corte_id: Int!
  }

  type TratamientoHerbicidas {
    id_trahe: Int
    producto: String
    dosis: Float
    presentacion: String
    valor: Float
    aplico: String
    nota: String
    aphe_id: Int
    aplicacionHPadre: AplicacionHerbicidas
  }

  input TratamientoHerbicidasInput {
    id_trahe: Int
    producto: String!
    dosis: Float!
    presentacion: String!
    valor: Float!
    aplico: String!
    nota: String
    aphe_id: Int!
  }

  type AplicacionFertilizantes {
    id_apfe: Int
    fecha: String
    tipo: String
    corte_id: Int
    listTratamientoFertilizante: [TratamientoFertilizantes]
  }

  input AplicacionFertilizantesInput {
    id_apfe: Int
    fecha: String!
    tipo: String!
    corte_id: Int!
  }

  type TratamientoFertilizantes {
    id_trafe: Int
    producto: String
    dosis: Float
    presentacion: String
    valor: Float
    aplico: String
    nota: String
    apfe_id: Int
    aplicacionFPadre: AplicacionFertilizantes
  }

  input TratamientoFertilizantesInput {
    id_trafe: Int
    producto: String!
    dosis: Float!
    presentacion: String!
    valor: Float!
    aplico: String!
    nota: String
    apfe_id: Int!
  }

  type Pluviometro {
    id_pluviometro: Int
    nombre: Int
    suertesAsociadas: String
    listlluvias: [Lluvia]
  }

  input PluviometroInput {
    id_pluviometro: Int
    nombre: Int!
    suertesAsociadas: String
  }

  type Lluvia {
    id_lluvia: Int
    fecha: String
    cantidad: Float
    pluviometro_id: Int
    PluviometroPadre: Pluviometro
  }

  input LluviaInput {
    id_lluvia: Int
    fecha: String!
    cantidad: Float!
    pluviometro_id: Int!
  }

  type Riego {
    id_riego: Int,
    fecha: String,
    num_riego: Int,
    corte_id: Int
    listRiegos: [AplicacionRiego]
  }

  input RiegoInput {
    id_riego: Int
    fecha: String!,
    num_riego: Int!,
    corte_id: Int!
  }

  type AplicacionRiego {
    id_apriego: Int,
    riego_id: Int,
    tablon_id: Int
    num_tablon: Int
  }

  input AplicacionRiegoInput {
    id_apriego: Int,
    riego_id: Int!,
    tablon_id: Int!
    num_tablon: Int!
  }

  type Cosecha {
    id_cosecha: Int
    peso: Float
    rendimiento: Float
    numeroVagones: Int
    numeroMulas: Int
    corte_id: Int
    cortePadre: Corte
  }

  input CosechaInput {
    id_cosecha: Int
    peso: Float!
    rendimiento: Float
    numeroVagones: Int
    numeroMulas: Int
    corte_id: Int!
  }

  type AplicacionPlaga {
    id_apla: Int
    fecha: String
    corte_id: Int
    tablon_id: Int
    trapl_id: Int
  }

  input AplicacionPlagaInput {
    id_apla: Int
    fecha: String!
    corte_id: Int!
    tablon_id: Int!
    trapl_id: Int!
  }

  type TratamientoPlaga {
    id_trapl: Int
    producto: String
    unidad: String
    cantidad: Float
    tiempo: String
  }

  input TratamientoPlagaInput {
    id_trapl: Int
    producto: String!
    unidad: String!
    cantidad: Float!
    tiempo: String!
  }

  
  type Maquinaria {
    idMaquinaria: Int
    marca: String
    serie: String
    modelo: Int
    potencia: Int
    color: String
  }

  input MaquinariaInput {
    idMaquinaria: Int
    marca: String
    serie: String
    modelo: Int
    potencia: Int
    color: String
  }


  type Insumo {
    idInsumo: Int
    nombre: String
    referencia: String
    marca: String
    cantidad: String
  }

  input InsumoInput {
    idInsumo: Int
    nombre: String
    referencia: String
    marca: String
    cantidad: String
  }


  type Mantenimiento {
    idMantenimiento: Int
    fecha: String
    detalle: String
    horaCambio: String
    tipoCambio: Boolean
    proximoCambio: Int
    cantidad: String
    insumoId: Int
    ApMantId: Int
    insumoPadre: Insumo
  }

  input MantenimientoInput {
    idMantenimiento: Int
    fecha: String
    detalle: String
    horaCambio: String
    tipoCambio: Boolean
    proximoCambio: Int
    cantidad: String
    insumoId: Int
    ApMantId: Int
  }


  type AplicacionMantenimiento {
    idApMant: Int
    fecha: String
    nombre: String
    maquinariaId: Int
    listMantenimientos: [Mantenimiento]
  }


  input AplicacionMantenimientoInput {
    idApMant: Int
    fecha: String
    nombre: String
    maquinariaId: Int
  }


  type ResponseMessage {
    success: Boolean,
    message: String
  }

  type alertaMensaje {
    suerte: String,
    mensaje: String
  }

  input alertaMensajeInput {
    suerte: String,
    mensaje: String
  }


  input informeVonsucro {
    area: Float
    corte: Int
    dosis: Float
    id_trafe: Int
    id_trahe: Int
    identificador: Int
    presentacion: String
    producto: String
    suerte: String
  }
`

