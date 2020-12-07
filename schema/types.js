module.exports=`
  type Usuario {
    id_usuario: Int
    nombre: String
    apellido: String
    email: String
    password: String
    rol: Int
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
<<<<<<< HEAD
    createdAt: String
    listcortes: [Corte]
=======
    listcortes: [Corte]
    listTablones: [Tablon]
>>>>>>> e647131971aeb667a205d688b46ac6103896c168
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
<<<<<<< HEAD
    corte_id: Int
    cortePapa: Corte
=======
    suerte_id: Int
    suertePapa: Suerte
>>>>>>> e647131971aeb667a205d688b46ac6103896c168
  }

  input TablonInput {
    id_tablon: Int
    numero: Int!
    area: Float!
<<<<<<< HEAD
    corte_id: Int!
=======
    suerte_id: Int!
>>>>>>> e647131971aeb667a205d688b46ac6103896c168
  }

  type Corte {
    id_corte: Int
    numero: Int
    fecha_siembra: String
    fecha_inicio: String
    fecha_corte: String
    activo: Boolean
<<<<<<< HEAD
    area: Float
    suerte_id: Int
    estado: Boolean
    listcosechas: [Cosecha]
    listTablones: [Tablon]
=======
    suerte_id: Int
    estado: Boolean
    listcosechas: [Cosecha]
>>>>>>> e647131971aeb667a205d688b46ac6103896c168
    suertePadre: Suerte
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
    listlluvias: [Lluvia]
  }

  input PluviometroInput {
    id_pluviometro: Int
    nombre: Int!
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

  type Cosecha {
    id_cosecha: Int
    peso: Float
    rendimiento: Float
    corte_id: Int
    cortePadre: Corte
  }

  input CosechaInput {
    id_cosecha: Int
    peso: Float!
    rendimiento: Float
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
`
