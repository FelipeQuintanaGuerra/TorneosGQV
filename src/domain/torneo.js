export class Torneo {
  #nombre;
  #descripcion;
  #tipo;
  #fecha;
  #hora;
  #limiteUsuarios;
  //#cantidadUsuarios;
  #usuarios;
  #posiciones;
  #partidos;
  #esPublico;
  #tablaPartidos;

  constructor(
    nombre,
    descripcion,
    tipo,
    fecha,
    hora,
    limiteUsuarios,
    cantidadUsuarios,
    usuarios,
    esPublico,
    tablaPartidos,
  ) {
    this.#nombre = nombre;
    this.#descripcion = descripcion;
    this.#tipo = tipo;
    this.#fecha = fecha;
    this.#hora = hora;
    this.#limiteUsuarios = limiteUsuarios;
    this.cantidadUsuarios = cantidadUsuarios;
    this.#usuarios = usuarios;
    this.#posiciones = [limiteUsuarios];
    this.#partidos = [];
    this.#esPublico = esPublico;
    this.#tablaPartidos = tablaPartidos || [];
  }

  getNombre() {
    return this.#nombre;
  }

  setNombre(nombre) {
    this.#nombre = nombre;
  }

  getDescripcion() {
    return this.#descripcion;
  }

  setDescripcion(descripcion) {
    this.#descripcion = descripcion;
  }

  getTipo() {
    return this.#tipo;
  }

  setTipo(tipo) {
    this.#tipo = tipo;
  }

  getFecha() {
    return this.#fecha;
  }

  setFecha(fecha) {
    this.#fecha = fecha;
  }

  getHora() {
    return this.#hora;
  }

  setHora(hora) {
    this.#hora = hora;
  }

  getLimiteUsuarios() {
    return this.#limiteUsuarios;
  }

  setLimiteUsuarios(limite) {
    this.#limiteUsuarios = limite;
  }

  getUsuarios() {
    return this.#usuarios;
  }

  agregarUsuario(usuario) {
    this.#usuarios.push(usuario);
  }

  getPosiciones() {
    return this.#posiciones;
  }

  setPosiciones(posiciones) {
    this.#posiciones = posiciones;
  }

  getPartidos() {
    return this.#partidos;
  }

  agregarPartido(partido) {
    this.#partidos.push(partido);
  }

  getEsPublico() {
    return this.#esPublico;
  }

  setEsPublico(esPublico) {
    this.#esPublico = esPublico;
  }

  getTablaPartidos() {
    return this.#tablaPartidos;
  }

  setTablaPartidos(tablaPartidos) {
    this.#tablaPartidos = tablaPartidos;
  }
}
