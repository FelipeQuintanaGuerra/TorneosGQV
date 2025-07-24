export class Ranking {
  #usuarios;

  constructor(usuarios) {
    this.#usuarios = usuarios;
  }

  puntosTotales(usuario) {
    const resultados = usuario.getResultados();
    let total = 0;
    for (let pos in resultados) {
      const cantidad = resultados[pos];
      let puntos = 1;
      if (pos == 1) puntos = 10;
      else if (pos == 2) puntos = 7;
      else if (pos == 3) puntos = 4;
      else if (pos == 4) puntos = 2;
      total += puntos * cantidad;
    }
    return total;
  }

  generarTabla() {
    const usuariosOrdenados = [...this.#usuarios];
    usuariosOrdenados.sort(
      (a, b) => this.puntosTotales(b) - this.puntosTotales(a),
    );
    return usuariosOrdenados.map((usuario, index) => ({
      posicion: index + 1,
      nombre: usuario.getNombre(),
      puntos: this.puntosTotales(usuario),
    }));
  }

  getUsuarioPorIndice(idx) {
    return this.#usuarios[idx];
  }

  getUsuariosOrdenadosPorPuntos() {
    const usuariosOrdenados = [...this.#usuarios];
    usuariosOrdenados.sort(
      (a, b) => this.puntosTotales(b) - this.puntosTotales(a),
    );
    return usuariosOrdenados;
  }
}

/*

// -------------------------------
// Ejemplo de uso
// -------------------------------

const usuarios = [
  new Usuario("Ana", [1, 2, 5]),
  new Usuario("Luis", [2, 2, 3]),
  new Usuario("Carla", [4, 1, 1]),
  new Usuario("Tomás", [5, 5, 4])
];




const ranking = new Ranking(usuarios);
const datos = ranking.generarTabla();

function mostrarRanking(ranking) {
  const tbody = document.getElementById("tabla-ranking");
  tbody.innerHTML = ""; // limpiar tabla previa

  const datos = ranking.generarTabla();

  datos.forEach(({ posicion, nombre, puntos }) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${posicion}</td>
      <td>${nombre}</td>
      <td class="fw-bold">${puntos}</td>
    `;
    tbody.appendChild(tr);
  });
}

*/
