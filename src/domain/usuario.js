export class Usuario {
  #nombre;
  #resultados;
  #torneosParticipadaos;
  #victorias;
  #partidasJugadas;
  #winRate;

  constructor(Nombre) {
    if (!Nombre || Nombre.trim() === "") {
      throw new Error("El nombre del usuario no puede ser vacío");
    }
    this.#nombre = Nombre;
    this.#resultados = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    this.#victorias = 0;
    this.#partidasJugadas = 0;
    this.#torneosParticipadaos = 0;
    this.#winRate = 0;
  }

  getNombre() {
    return this.#nombre;
  }
  setNombre(Nombre) {
    if (!Nombre || Nombre.trim() === "") {
      throw new Error("El nombre del usuario no puede ser vacío");
    }
    this.#nombre = Nombre;
  }

  getResultados() {
    return { ...this.#resultados };
  }

  agregarResultado(posicion) {
    const key = posicion > 5 ? 5 : posicion;

    if (this.#resultados[key] !== undefined) {
      this.#resultados[key]++;
    } else {
      this.#resultados[key] = 1;
    }
  }

  limpiarResultados() {
    this.#resultados = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  }

  getPartidasJugadas() {
    return this.#partidasJugadas;
  }

  aumentarPartidas() {
    this.#partidasJugadas++;
  }

  getPartidasGanadas() {
    return this.#victorias;
  }

  aumentarVictorias() {
    this.#victorias += 1;
  }

  getTorneosParticipados() {
    return this.#torneosParticipadaos;
  }

  aumentarTorneos() {
    this.#torneosParticipadaos++;
  }

  getWinRate() {
    return this.#winRate;
  }

  actualizarWR() {
    this.#winRate = (this.#victorias / this.#partidasJugadas) * 100;
  }

  toString() {
    return `Usuario: ${this.#nombre}  ?? "no registrado"}`;
  }
}
