import { describe, test, expect, beforeEach } from "@jest/globals";
import { Ranking } from "../ranking";
import { Usuario } from "../usuario";

describe("Ranking class tests", () => {
  let usuarios, ranking;

  beforeEach(() => {
    usuarios = [new Usuario("Ana"), new Usuario("Luis"), new Usuario("Carla")];
    usuarios[0].agregarResultado(1);
    usuarios[0].agregarResultado(1);
    usuarios[0].agregarResultado(2);

    usuarios[1].agregarResultado(2);
    usuarios[1].agregarResultado(2);
    usuarios[1].agregarResultado(3);

    usuarios[2].agregarResultado(4);
    usuarios[2].agregarResultado(1);
    usuarios[2].agregarResultado(5);

    ranking = new Ranking(usuarios);
  });

  test("puntosTotales calcula correctamente los puntos de un usuario", () => {
    expect(ranking.puntosTotales(usuarios[0])).toBe(27);
    expect(ranking.puntosTotales(usuarios[1])).toBe(18);
    expect(ranking.puntosTotales(usuarios[2])).toBe(13);
  });

  test("generarTabla retorna usuarios ordenados por puntos", () => {
    const tabla = ranking.generarTabla();
    expect(tabla.length).toBe(3);
    expect(tabla[0].nombre).toBe("Ana");
    expect(tabla[1].nombre).toBe("Luis");
    expect(tabla[2].nombre).toBe("Carla");
    expect(tabla[0].puntos).toBe(27);
    expect(tabla[1].puntos).toBe(18);
    expect(tabla[2].puntos).toBe(13);
    expect(tabla[0].posicion).toBe(1);
    expect(tabla[1].posicion).toBe(2);
    expect(tabla[2].posicion).toBe(3);
  });

  test("getUsuarioPorIndice retorna el usuario correcto", () => {
    expect(ranking.getUsuarioPorIndice(0)).toBe(usuarios[0]);
    expect(ranking.getUsuarioPorIndice(1)).toBe(usuarios[1]);
    expect(ranking.getUsuarioPorIndice(2)).toBe(usuarios[2]);
  });

  test("getUsuariosOrdenadosPorPuntos retorna usuarios ordenados", () => {
    const ordenados = ranking.getUsuariosOrdenadosPorPuntos();
    expect(ordenados[0]).toBe(usuarios[0]);
    expect(ordenados[1]).toBe(usuarios[1]);
    expect(ordenados[2]).toBe(usuarios[2]);
  });

  test("puntosTotales retorna 0 si el usuario no tiene resultados", () => {
    const nuevo = new Usuario("Pepe");
    expect(ranking.puntosTotales(nuevo)).toBe(0);
  });
});
