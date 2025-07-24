export class Partida {
  #usuario1;
  #usuario2;
  #ganador = null;
  #perdedor = null;
  #puntos;
  #mesa;

  constructor(usuario1, usuario2, mesa) {
    if (usuario1 === usuario2 && usuario1 != null && usuario2 != null) {
      throw new Error("Los usuarios deben ser distintos");
    }

    this.#usuario1 = usuario1;
    this.#usuario2 = usuario2;
    this.#mesa = mesa;

    this.#puntos = new Map();
    this.#puntos.set(usuario1, 0);
    this.#puntos.set(usuario2, 0);
  }

  setResultado(ganador, perdedor, puntajeGanador, puntajePerdedor) {
    if (
      ![this.#usuario1, this.#usuario2].includes(ganador) ||
      ![this.#usuario1, this.#usuario2].includes(perdedor)
    ) {
      throw new Error(
        "El ganador y el perdedor deben estar entre los jugadores",
      );
    }

    if (ganador === perdedor) {
      throw new Error("El ganador y el perdedor deben ser distintos");
    }

    this.#ganador = ganador;
    this.#perdedor = perdedor;
    this.#puntos.set(ganador, puntajeGanador);
    this.#puntos.set(perdedor, puntajePerdedor);

    this.#usuario1.aumentarPartidas();
    this.#usuario2.aumentarPartidas();
    ganador.aumentarVictorias();
    this.#usuario1.actualizarWR();
    this.#usuario2.actualizarWR();
  }

  actualizarPuntaje(usuario, puntaje) {
    if (![this.#usuario1, this.#usuario2].includes(usuario)) {
      throw new Error("El usuario no participa en esta partida");
    }
    this.#puntos.set(usuario, puntaje);
  }

  getPuntaje(usuario) {
    return this.#puntos.get(usuario);
  }

  getGanador() {
    return this.#ganador;
  }

  getPerdedor() {
    return this.#perdedor;
  }

  getMesa() {
    return this.#mesa;
  }
  setMesa(mesa) {
    this.#mesa = mesa;
  }

  toString() {
    const nombre1 = this.#usuario1.getNombre();
    const nombre2 = this.#usuario2.getNombre();
    const g = this.#ganador ? this.#ganador.getNombre() : "sin definir";
    return `Mesa ${this.#mesa}: ${nombre1} vs ${nombre2} - Ganador: ${g}`;
  }
}
