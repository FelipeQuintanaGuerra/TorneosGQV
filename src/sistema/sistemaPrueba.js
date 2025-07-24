import { Usuario } from "../domain/usuario.js";
import { Partida } from "../domain/partida.js";
import { Torneo } from "../domain/torneo.js";
import { Ranking } from "../domain/ranking.js";

export function crearSistemaDePrueba() {
  // Usuarios
  const ana = new Usuario("Ana");
  const luis = new Usuario("Luis");
  const carla = new Usuario("Carla");
  const tomas = new Usuario("Tomás");
  const matias = new Usuario("Matías");

  // Crear torneo
  const torneo1 = new Torneo("Torneo de Verano", "SE", [
    ana,
    luis,
    carla,
    tomas,
    matias,
  ]);

  // Crear partidas simuladas
  const partida1 = new Partida(ana, luis, 1);
  partida1.setResultado(ana, luis, 10, 7);
  const partida2 = new Partida(carla, tomas, 2);
  partida2.setResultado(carla, tomas, 10, 4);
  const partida3 = new Partida(ana, carla, 3);
  partida3.setResultado(ana, carla, 10, 3);
  const partida4 = new Partida(luis, tomas, 4);
  partida4.setResultado(luis, tomas, 10, 8);

  torneo1.agregarPartido(partida1);
  torneo1.agregarPartido(partida2);
  torneo1.agregarPartido(partida3);
  torneo1.agregarPartido(partida4);

  // Agregar resultados
  ana.agregarResultado(1);
  carla.agregarResultado(2);
  luis.agregarResultado(3);
  tomas.agregarResultado(4);

  ana.aumentarTorneos();
  carla.aumentarTorneos();
  luis.aumentarTorneos();
  tomas.aumentarTorneos();
  // Crear ranking
  const ranking = new Ranking([ana, luis, carla, tomas, matias]);

  // Serializar torneo1 para guardarlo en localStorage
  const torneoObj = {
    nombre: torneo1.getNombre(),
    tipo: "SE",
    usuarios: [ana, luis, carla, tomas, matias].map((u) => ({
      nombre: u.getNombre(),
    })),
    // Puedes agregar más campos si quieres mostrar más info
  };

  // Guardar en localStorage (como array de torneos) SOLO si está vacío
  let torneos = JSON.parse(localStorage.getItem("torneos")) || [];
  // Verifica si ya existe un torneo con el mismo nombre
  if (!torneos.some((t) => t.nombre === torneoObj.nombre)) {
    torneos.push(torneoObj);
    localStorage.setItem("torneos", JSON.stringify(torneos));
  }
  return {
    usuarios: [ana, luis, carla, tomas, matias],
    torneo1,
    ranking,
    partidas: [partida1, partida2, partida3, partida4],
  };
}
