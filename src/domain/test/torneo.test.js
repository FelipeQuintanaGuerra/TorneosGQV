import { expect, test, describe, beforeEach } from "@jest/globals";
import { Torneo } from "../torneo";
import { Usuario } from "../usuario";
import { Partida } from "../partida";

describe("Torneo class tests", () => {
  let usuarios, torneo;

  beforeEach(() => {
    usuarios = [
      new Usuario("Ana"),
      new Usuario("Luis"),
      new Usuario("Carla"),
      new Usuario("Tomás"),
    ];
    torneo = new Torneo(
      "Torneo Test",
      "Descripción",
      "round robin",
      "2024-06-20",
      "18:00",
      8,
      usuarios.length,
      usuarios,
      true,
    );
  });

  test("getNombre y setNombre funcionan correctamente", () => {
    expect(torneo.getNombre()).toBe("Torneo Test");
    torneo.setNombre("Nuevo Nombre");
    expect(torneo.getNombre()).toBe("Nuevo Nombre");
  });

  test("getDescripcion y setDescripcion funcionan correctamente", () => {
    expect(torneo.getDescripcion()).toBe("Descripción");
    torneo.setDescripcion("Otra descripción");
    expect(torneo.getDescripcion()).toBe("Otra descripción");
  });

  test("getTipo y setTipo funcionan correctamente", () => {
    expect(torneo.getTipo()).toBe("round robin");
    torneo.setTipo("single elimination");
    expect(torneo.getTipo()).toBe("single elimination");
  });

  test("getFecha y setFecha funcionan correctamente", () => {
    expect(torneo.getFecha()).toBe("2024-06-20");
    torneo.setFecha("2024-07-01");
    expect(torneo.getFecha()).toBe("2024-07-01");
  });

  test("getHora y setHora funcionan correctamente", () => {
    expect(torneo.getHora()).toBe("18:00");
    torneo.setHora("20:00");
    expect(torneo.getHora()).toBe("20:00");
  });

  test("getLimiteUsuarios y setLimiteUsuarios funcionan correctamente", () => {
    expect(torneo.getLimiteUsuarios()).toBe(8);
    torneo.setLimiteUsuarios(16);
    expect(torneo.getLimiteUsuarios()).toBe(16);
  });

  test("getUsuarios y agregarUsuario funcionan correctamente", () => {
    expect(torneo.getUsuarios().length).toBe(4);
    const nuevo = new Usuario("Pepe");
    torneo.agregarUsuario(nuevo);
    expect(torneo.getUsuarios().length).toBe(5);
  });

  test("getPartidos y agregarPartido funcionan correctamente", () => {
    expect(torneo.getPartidos().length).toBe(0);
    const p = new Partida(usuarios[0], usuarios[1], 1);
    torneo.agregarPartido(p);
    expect(torneo.getPartidos().length).toBe(1);
  });

  test("getEsPublico y setEsPublico funcionan correctamente", () => {
    expect(torneo.getEsPublico()).toBe(true);
    torneo.setEsPublico(false);
    expect(torneo.getEsPublico()).toBe(false);
  });

  test("getPosiciones y setPosiciones funcionan correctamente", () => {
    expect(Array.isArray(torneo.getPosiciones())).toBe(true);
    torneo.setPosiciones([1, 2, 3]);
    expect(torneo.getPosiciones()).toEqual([1, 2, 3]);
  });

  test("getTablaPartidos y setTablaPartidos funcionan correctamente", () => {
    expect(torneo.getTablaPartidos()).toEqual([]);

    const tabla = [
      { jugador1: "Ana", jugador2: "Luis", resultado: "1-0" },
      { jugador1: "Carla", jugador2: "Tomás", resultado: "0-1" },
    ];

    torneo.setTablaPartidos(tabla);
    expect(torneo.getTablaPartidos()).toEqual(tabla);
  });

  test("constructor asigna [] a tablaPartidos si no se proporciona", () => {
    const torneoSinTabla = new Torneo(
      "Sin tabla",
      "Desc",
      "tipo",
      "2024-06-23",
      "20:00",
      4,
      0,
      [],
      true,
      undefined,
    );
    expect(torneoSinTabla.getTablaPartidos()).toEqual([]);
  });
});
