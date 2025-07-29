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
/*

  function crearBracketSE(usuarios) {
    let total = usuarios.length;
    let nextPow2 = 1;
    while (nextPow2 < total) nextPow2 *= 2;
    while (usuarios.length < nextPow2) usuarios.push({ nombre: "BYE" });

    const rondas = [];
    let jugadoresRonda = usuarios.map((u) => ({
      nombre: u.nombre ?? u.getNombre?.() ?? "",
    }));
    let partidoId = 1; // Contador global de partidos

    // Guarda los IDs de los partidos de la ronda anterior
    let idsRondaAnterior = [];

    while (jugadoresRonda.length > 1) {
      const partidasRonda = [];
      const idsRondaActual = [];
      for (let i = 0; i < jugadoresRonda.length; i += 2) {
        let jugador1 = jugadoresRonda[i].nombre;
        let jugador2 = jugadoresRonda[i + 1].nombre;

        // Si no hay nombre, es porque es un ganador de un partido anterior
        if (!jugador1) jugador1 = `Ganador partido ${idsRondaAnterior[i]}`;
        if (!jugador2) jugador2 = `Ganador partido ${idsRondaAnterior[i + 1]}`;

        partidasRonda.push({
          id: partidoId,
          jugador1,
          jugador2,
          resultado: "",
        });
        idsRondaActual.push(partidoId);
        partidoId++;
      }
      rondas.push(partidasRonda);
      // Para la siguiente ronda, solo pasan los ganadores (a definir después)
      jugadoresRonda = new Array(Math.ceil(jugadoresRonda.length / 2)).fill({
        nombre: "",
      });
      idsRondaAnterior = idsRondaActual;
    }
    return rondas;
  }

  function crearBracketRR(usuarios) {
    const cantUsuarios = usuarios.length;
    const tablaPartidos = [];
    //let mesa = 1;

    for (let i = 0; i < cantUsuarios; i++) {
      tablaPartidos[i] = [];
      for (let j = 0; j < cantUsuarios; j++) {
        if (i === j) {
          tablaPartidos[i][j] = null;
        } else {
          tablaPartidos[i][j] = {
            jugador1: usuarios[i].nombre ?? usuarios[i].getNombre?.() ?? "",
            jugador2: usuarios[j].nombre ?? usuarios[j].getNombre?.() ?? "",
            resultado: "",
          };
        }
      }
    }
    return tablaPartidos;
  }
*/