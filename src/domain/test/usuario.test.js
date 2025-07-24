import { expect, test, describe, beforeEach } from "@jest/globals";
import { Usuario } from "../usuario";

describe("Usuario class tests", () => {
  let usuario;

  beforeEach(() => {
    usuario = new Usuario("Pedro");
  });

  test("No permite crear usuario con nombre vacío", () => {
    expect(() => new Usuario("")).toThrow(
      "El nombre del usuario no puede ser vacío",
    );
  });

  test("getNombre y setNombre funcionan correctamente", () => {
    expect(usuario.getNombre()).toBe("Pedro");
    usuario.setNombre("Juan");
    expect(usuario.getNombre()).toBe("Juan");
  });

  test("setNombre lanza error si el nombre es vacío", () => {
    expect(() => usuario.setNombre("")).toThrow(
      "El nombre del usuario no puede ser vacío",
    );
  });

  test("agregarResultado y getResultados funcionan correctamente", () => {
    usuario.agregarResultado(1);
    usuario.agregarResultado(2);
    usuario.agregarResultado(6);
    const resultados = usuario.getResultados();
    expect(resultados[1]).toBe(1);
    expect(resultados[2]).toBe(1);
    expect(resultados[5]).toBe(1);
  });

  test("limpiarResultados reinicia los resultados", () => {
    usuario.agregarResultado(1);
    usuario.limpiarResultados();
    expect(usuario.getResultados()).toEqual({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  });

  test("getPartidasGanadas y aumentarVictorias funcionan correctamente", () => {
    expect(usuario.getPartidasGanadas()).toBe(0);
    usuario.aumentarVictorias();
    expect(usuario.getPartidasGanadas()).toBe(1);
  });

  test("getTorneosParticipados y aumentarTorneos funcionan correctamente", () => {
    expect(usuario.getTorneosParticipados()).toBe(0);
    usuario.aumentarTorneos();
    expect(usuario.getTorneosParticipados()).toBe(1);
  });

  test("actualizarWR y getWinRate funcionan correctamente", () => {
    usuario.aumentarVictorias();
    usuario.aumentarPartidas();
    usuario.aumentarPartidas();
    usuario.actualizarWR();
    expect(usuario.getWinRate()).toBeCloseTo(50);
  });

  test("toString muestra información del usuario", () => {
    expect(usuario.toString()).toContain("Usuario: Pedro");
  });

  test("getPartidasJugadas retorna la cantidad de partidas jugadas", () => {
    const usuario = new Usuario("Test");
    expect(usuario.getPartidasJugadas()).toBe(0);
    usuario.aumentarPartidas();
    usuario.aumentarPartidas();
    expect(usuario.getPartidasJugadas()).toBe(2);
  });

  test("agregarResultado crea la clave si no existe (else branch)", () => {
    const usuario = new Usuario("Test");
    usuario.limpiarResultados();
    usuario.agregarResultado(10);
    usuario.agregarResultado(6);
    usuario.agregarResultado(0);
    const resultados = usuario.getResultados();
    expect(resultados[0]).toBe(1);
  });
});
