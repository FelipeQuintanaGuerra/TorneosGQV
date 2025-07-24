import { expect, test, describe, beforeEach } from "@jest/globals";
import { Partida } from "../partida";
import { Usuario } from "../usuario";

describe("Partida class tests", () => {
  let usuario1, usuario2, partida;

  beforeEach(() => {
    usuario1 = new Usuario("Juan");
    usuario2 = new Usuario("Javier");
    partida = new Partida(usuario1, usuario2, 2);
  });

  test("usuarios no pueden ser iguales", () => {
    expect(() => new Partida(usuario1, usuario1, 1)).toThrow(
      "Los usuarios deben ser distintos",
    );
  });

  test("setResultado funciona", () => {
    partida.setResultado(usuario1, usuario2, 10, 5);
    expect(partida.getGanador()).toBe(usuario1);
    expect(partida.getPerdedor()).toBe(usuario2);
    expect(partida.getPuntaje(usuario1)).toBe(10);
    expect(partida.getPuntaje(usuario2)).toBe(5);
  });

  test("setResultado tira error si alguno de los jugadores no esta entre los jugadores", () => {
    const otro = new Usuario("Otro");
    expect(() => partida.setResultado(otro, usuario2, 1, 2)).toThrow(
      "El ganador y el perdedor deben estar entre los jugadores",
    );
    expect(() => partida.setResultado(usuario1, otro, 1, 2)).toThrow(
      "El ganador y el perdedor deben estar entre los jugadores",
    );
  });

  test("setResultado tira error si el ganador y perdedor son la misma persona", () => {
    expect(() => partida.setResultado(usuario1, usuario1, 1, 2)).toThrow(
      "El ganador y el perdedor deben ser distintos",
    );
  });

  test("actualizarPuntaje funciona", () => {
    partida.actualizarPuntaje(usuario1, 7);
    expect(partida.getPuntaje(usuario1)).toBe(7);
  });

  test("actualizarPuntaje tira error si usuario no esta en la partida", () => {
    const otro = new Usuario("Otro");
    expect(() => partida.actualizarPuntaje(otro, 1)).toThrow(
      "El usuario no participa en esta partida",
    );
  });

  test("get y setMesa funcionan ", () => {
    expect(partida.getMesa()).toBe(2);
    partida.setMesa(5);
    expect(partida.getMesa()).toBe(5);
  });

  test("getPuntaje inicial es 0", () => {
    expect(partida.getPuntaje(usuario1)).toBe(0);
    expect(partida.getPuntaje(usuario2)).toBe(0);
  });

  test("toString funciona", () => {
    expect(partida.toString()).toContain(
      "Mesa 2: Juan vs Javier - Ganador: sin definir",
    );
    partida.setResultado(usuario2, usuario1, 8, 3);
    expect(partida.toString()).toContain(
      "Mesa 2: Juan vs Javier - Ganador: Javier",
    );
  });
});
