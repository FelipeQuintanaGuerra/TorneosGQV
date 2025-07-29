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
function mostrarRanking(ranking) {
    const tbody = document.getElementById("tabla-ranking");
    if (!tbody) return; // Solo ejecuta si existe la tabla

    tbody.innerHTML = "";

    // Obtener usuarios ordenados junto con los datos
    const datos = ranking.generarTabla();
    // Obtener usuarios ordenados (debes modificar generarTabla para devolver también el objeto usuario)
    const usuariosOrdenados = ranking.getUsuariosOrdenadosPorPuntos();

    datos.forEach(({ posicion, nombre, puntos }, idx) => {
      const usuario = usuariosOrdenados[idx]; // usuario correcto según el orden mostrado

      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${posicion}</td>
      <td>${nombre}</td>
      <td class="fw-bold">${puntos}</td>
      <td>
        <button class="btn btn-sm btn-info p-1" data-idx="${idx}" style="background: none; border: none;">
          <img src="img/pokeball_closed_transparent.png" alt="Pokebola" width="32" height="32">
        </button>
      </td>
    `;
      tbody.appendChild(tr);

      // Fila oculta para info extra
      const trExtra = document.createElement("tr");
      trExtra.classList.add("info-extra");
      trExtra.style.display = "none";
      trExtra.innerHTML = `<td colspan="4" id="extra-${idx}"></td>`;
      tbody.appendChild(trExtra);

      // Evento para mostrar/ocultar info extra
      tr.querySelector("button").addEventListener("click", () => {
        const img = tr.querySelector("img");
        if (trExtra.style.display === "none") {
          document.getElementById(`extra-${idx}`).innerHTML = `
          <div class="mb-2 fw-bold fs-5 text-start">Estadísticas del usuario</div>
          <div class="row g-2 mb-4">
            <div class="col stat-card">
              <div class="stat-value">${usuario.getTorneosParticipados()}</div>
              <div class="stat-label">Torneos participados</div>
            </div>
            <div class="col stat-card">
              <div class="stat-value">${usuario.getPartidasJugadas()}</div>
              <div class="stat-label">Partidas jugadas</div>
            </div>
            <div class="col stat-card">
              <div class="stat-value">${usuario.getPartidasGanadas()}</div>
              <div class="stat-label">Partidas ganadas</div>
            </div>
            <div class="col stat-card">
              <div class="stat-value">${usuario.getPartidasJugadas() - usuario.getPartidasGanadas()}</div>
              <div class="stat-label">Partidas perdidas</div>
            </div>
            <div class="col stat-card">
              <div class="stat-value">${usuario.getWinRate()}</div>
              <div class="stat-label">Porcentaje de victorias</div>
            </div>
          </div>
          <div class="mb-2 fw-bold fs-5 text-start">Resultados</div>
          <div class="row g-2">
            <div class="col stat-card d-flex align-items-center">
              <span class="me-2 flex-shrink-0" style="font-size:1.7rem; width:33%;">🏆</span>
              <span style="width:67%;">
                <div class="stat-value">${usuario.getResultados()[1] ?? 0}</div>
                <div class="stat-label">Torneos ganados</div>
              </span>
            </div>
            <div class="col stat-card d-flex align-items-center">
              <span class="me-2 flex-shrink-0" style="font-size:1.7rem; width:33%;">🥈</span>
              <span style="width:67%;">
                <div class="stat-value">${usuario.getResultados()[2] ?? 0}</div>
                <div class="stat-label">2° Puesto</div>
              </span>
            </div>
            <div class="col stat-card d-flex align-items-center">
              <span class="me-2 flex-shrink-0" style="font-size:1.7rem; width:33%;">🥉</span>
              <span style="width:67%;">
                <div class="stat-value">${usuario.getResultados()[3] ?? 0}</div>
                <div class="stat-label">3° Puesto</div>
              </span>
            </div>
            <div class="col stat-card d-flex align-items-center">
              <span class="me-2 flex-shrink-0" style="font-size:1.7rem; width:33%;">🌿</span>
              <span style="width:67%;">
                <div class="stat-value">${usuario.getResultados()[4] ?? 0}</div>
                <div class="stat-label">Top 4</div>
              </span>
            </div>
            <div class="col stat-card d-flex align-items-center">
              <span class="me-2 flex-shrink-0" style="font-size:1.7rem; width:33%;">🎲</span>
              <span style="width:67%;">
                <div class="stat-value">${usuario.getResultados()[5] ?? 0}</div>
                <div class="stat-label">Fuera del top 4</div>
              </span>
            </div>
          </div>
        `;
          trExtra.style.display = "";
          img.src = "img/pokeball_open_mirrored_wide_50.png";
          img.width = 55;
        } else {
          trExtra.style.display = "none";
          img.src = "img/pokeball_closed_transparent.png"; // Vuelve a pokebola cerrada
          img.width = 32;
        }
      });
    });
  }
*/
