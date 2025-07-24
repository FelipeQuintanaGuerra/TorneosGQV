//import { Partida } from "../domain/partida.js";
//import { Ranking } from "../domain/ranking.js";
import { Torneo } from "../domain/torneo.js";
import { Usuario } from "../domain/usuario.js";
import { crearSistemaDePrueba } from "../sistema/sistemaPrueba.js";
//localStorage.clear();
document.addEventListener("DOMContentLoaded", () => {
  // Crea los usuarios, ranking, torneo y partidas de prueba

  if (window.location.pathname.endsWith("ranking.html")) {
    const { usuarios, ranking, torneo, partidas } = crearSistemaDePrueba();
    window.usuarios = usuarios;
    window.ranking = ranking;
    window.torneo = torneo;
    window.partidas = partidas;
    // Mostrar ranking solo si existe la tabla en la página
    mostrarRanking(ranking);
  }

  // Código para torneos
  const tbody = document.getElementById("tabla-torneos");
  if (tbody) {
    const torneos = JSON.parse(localStorage.getItem("torneos")) || [];
    tbody.innerHTML = "";
    torneos.forEach((torneo, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${torneo.nombre}</td>
        <td>${torneo.usuarios.length}</td>
        <td>${torneo.tipo}</td>
        <td>
          <a href="torneo.html?idx=${idx}" class="btn btn-primary btn-sm">Ver torneo</a>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

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

  //seleccionar un tipo
  window.setTipo = function (tipo, btn) {
    document.querySelectorAll(".tipo-card.selected").forEach((card) => {
      card.classList.remove("selected");
    });
    btn.classList.add("selected");
    window.tipoSeleccionado = tipo;
  };

  //crear torneo
  window.crearTorneo = function () {
    const tipo =
      document.querySelector("#tipo-torneo-cards .tipo-card.selected")?.dataset
        .tipo || "";

    const nombre = document.getElementById("nombreTorneo").value.trim();
    const descripcion = document
      .getElementById("descripcionTorneo")
      .value.trim();
    const fecha = document.getElementById("fechaTorneo").value;
    const hora = document.getElementById("horaTorneo").value;
    const limiteUsuarios = parseInt(
      document.getElementById("limiteParticipantes").value,
      10,
    );
    const esPublico = document.getElementById("publicoSi").checked;

    const participantesRaw =
      document.getElementById("participantes")?.value.trim() || "";

    if (
      !nombre ||
      !tipo ||
      !fecha ||
      !hora ||
      !limiteUsuarios ||
      !participantesRaw
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const nombresParticipantes = participantesRaw
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n);
    const usuarios = nombresParticipantes.map((nombre) => new Usuario(nombre));

    let tablaPartidos = null;
    if (tipo === "SE") {
      tablaPartidos = crearBracketSE(usuarios);
      console.log("Bracket SE:", tablaPartidos);
    }
    if (tipo === "RR") {
      tablaPartidos = crearBracketRR(usuarios);
      console.log("Bracket RR:", tablaPartidos);
    }

    if (usuarios.length > limiteUsuarios) {
      alert(
        `El número de participantes (${usuarios.length}) supera el límite permitido (${limiteUsuarios}).`,
      );
      return;
    }

    const torneo = new Torneo(
      nombre,
      descripcion,
      tipo,
      fecha,
      hora,
      limiteUsuarios,
      usuarios.length, // cantidadUsuarios
      usuarios,
      esPublico,
      tablaPartidos,
    );

    const torneos = JSON.parse(localStorage.getItem("torneos")) || [];
    torneos.push({
      nombre: torneo.getNombre(),
      descripcion: torneo.getDescripcion(),
      tipo: torneo.getTipo(),
      fecha: torneo.getFecha(),
      hora: torneo.getHora(),
      limiteUsuarios: torneo.getLimiteUsuarios(),
      usuarios: usuarios.map((u) => ({ nombre: u.getNombre() })),
      esPublico: torneo.getEsPublico(),
      tablaPartidos: torneo.getTablaPartidos(),
    });
    localStorage.setItem("torneos", JSON.stringify(torneos));

    alert("¡Torneo creado exitosamente!");
  };
  //fin crear torneo

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

  // Función para generar la tabla Round Robin
  function generarTablaRoundRobin(
    tablaPartidos,
    nombresParticipantes,
    torneoIdx,
  ) {
    console.log("tablaPartidos:", tablaPartidos);
    const table = document.createElement("table");
    table.className = "table table-bordered text-center";

    // Cabecera
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    headRow.appendChild(document.createElement("th")); // Esquina vacía
    nombresParticipantes.forEach((nombre) => {
      const th = document.createElement("th");
      th.textContent = nombre;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    // Cuerpo
    const tbody = document.createElement("tbody");
    tablaPartidos.forEach((fila, i) => {
      const tr = document.createElement("tr");
      // Nombre del participante en la fila
      const th = document.createElement("th");
      th.textContent = nombresParticipantes[i];
      tr.appendChild(th);

      fila.forEach((partido, j) => {
        const td = document.createElement("td");
        if (i === j) {
          td.textContent = "—";
          td.style.background = "#f0f0f0";
        } else if (partido) {
          td.textContent = partido.resultado ?? "";
          td.style.cursor = "pointer";
          td.onclick = () => {
            // Evita múltiples inputs en la misma celda
            if (td.querySelector("input")) return;

            // Crear inputs para los puntajes
            const input1 = document.createElement("input");
            input1.type = "number";
            input1.min = "0";
            input1.value = partido.resultado?.split("-")[0]?.trim() || "";
            input1.style.width = "70px";
            input1.className = "form-control d-inline-block mx-1";

            const span = document.createElement("span");
            span.textContent = " - ";

            const input2 = document.createElement("input");
            input2.type = "number";
            input2.min = "0";
            input2.value = partido.resultado?.split("-")[1]?.trim() || "";
            input2.style.width = "70px";
            input2.className = "form-control d-inline-block mx-1";

            const btn = document.createElement("button");
            btn.textContent = "OK";
            btn.className = "btn btn-success btn-sm ms-1";

            btn.onclick = (e) => {
              e.stopPropagation();
              const val1 = input1.value.trim();
              const val2 = input2.value.trim();
              if (
                val1 === "" ||
                val2 === "" ||
                isNaN(val1) ||
                isNaN(val2) ||
                val1 < 0 ||
                val2 < 0
              ) {
                alert("Ambos puntajes deben ser números enteros positivos.");
                return;
              }
              const nuevoResultado = `${val1} - ${val2}`;
              const resultadoSimetrico = `${val2} - ${val1}`;
              td.textContent = nuevoResultado;
              // Actualiza la matriz en localStorage
              const torneos = JSON.parse(localStorage.getItem("torneos")) || [];
              torneos[torneoIdx].tablaPartidos[i][j].resultado = nuevoResultado;
              torneos[torneoIdx].tablaPartidos[j][i].resultado =
                resultadoSimetrico;
              localStorage.setItem("torneos", JSON.stringify(torneos));
              window.location.reload();
            };

            td.textContent = "";
            td.appendChild(input1);
            td.appendChild(span);
            td.appendChild(input2);
            td.appendChild(btn);
            input1.focus();
          };
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    return table;
  }

  if (window.location.pathname.endsWith("torneo.html")) {
    const params = new URLSearchParams(window.location.search);
    const idx = params.get("idx");
    const torneos = JSON.parse(localStorage.getItem("torneos")) || [];
    const torneo = torneos[idx];
    const contenedor = document.getElementById("bracket-container");
    if (!torneo) {
      contenedor.innerHTML = "<p>No se encontró el torneo.</p>";
      return;
    }
    contenedor.innerHTML = `<h2>${torneo.nombre}</h2>
       <p>Tipo: ${torneo.tipo}</p>
       <p>Fecha: ${torneo.fecha + "  " + torneo.hora}</p>
       <p>Partidos del torneo</p>
       <hr>`;
    if (torneo.tipo === "RR" && torneo.tablaPartidos) {
      // Visualización en tabla
      contenedor.appendChild(
        generarTablaRoundRobin(
          torneo.tablaPartidos,
          torneo.usuarios.map((u) => u.nombre),
          idx,
        ),
      );
      // Visualización como lista de partidos
      contenedor.appendChild(
        renderListaPartidosRR(
          torneo.tablaPartidos,
          torneo.usuarios.map((u) => u.nombre),
        ),
      );
    } else if (torneo.tipo === "SE" && torneo.tablaPartidos) {
      contenedor.appendChild(renderBracketSE(torneo.tablaPartidos));
    } else {
      contenedor.innerHTML +=
        "<p>Bracket no implementado para este tipo de torneo.</p>";
    }
  }

  function renderBracketSE(rondas) {
    const container = document.createElement("div");
    rondas.forEach((partidas, idxRonda) => {
      const rondaDiv = document.createElement("div");
      rondaDiv.className = "mb-3";
      rondaDiv.innerHTML = `<h5>Ronda ${idxRonda + 1}</h5>`;
      const row = document.createElement("div");
      row.className = "row";
      partidas.forEach((partido, idxPartido) => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-2";
        const card = document.createElement("div");
        card.className = "card p-2";
        card.innerHTML = `
        <div class="fw-bold mb-1">Partido ${partido.id}:</div>
        <div><strong>${partido.jugador1}</strong> vs <strong>${partido.jugador2}</strong></div>
        <div id="resultado-box-${idxRonda}-${idxPartido}" style="cursor:pointer;">
          ${
            partido.ganador
              ? `Ganó <strong>${partido.ganador}</strong> - ${partido.resultado}`
              : partido.resultado
                ? `Ganó <strong>${partido.ganador}</strong> - ${partido.resultado}`
                : `<span class="text-muted">Click para ingresar resultado</span>`
          }
        </div>
      `;
        row.appendChild(col);
        col.appendChild(card);

        setTimeout(() => {
          const resultadoBox = document.getElementById(
            `resultado-box-${idxRonda}-${idxPartido}`,
          );
          resultadoBox.onclick = () => {
            if (resultadoBox.querySelector("input")) return;

            const input1 = document.createElement("input");
            input1.type = "number";
            input1.min = "0";
            input1.value = partido.resultado?.split("-")[0]?.trim() || "";
            input1.style.width = "60px";
            input1.className = "form-control d-inline-block mx-1";

            const span = document.createElement("span");
            span.textContent = " - ";

            const input2 = document.createElement("input");
            input2.type = "number";
            input2.min = "0";
            input2.value = partido.resultado?.split("-")[1]?.trim() || "";
            input2.style.width = "60px";
            input2.className = "form-control d-inline-block mx-1";

            const btn = document.createElement("button");
            btn.textContent = "OK";
            btn.className = "btn btn-success btn-sm ms-1";

            btn.onclick = (e) => {
              e.stopPropagation();
              const val1 = input1.value.trim();
              const val2 = input2.value.trim();
              const num1 = parseInt(val1, 10);
              const num2 = parseInt(val2, 10);
              if (
                val1 === "" ||
                val2 === "" ||
                isNaN(num1) ||
                isNaN(num2) ||
                num1 < 0 ||
                num2 < 0
              ) {
                alert("Ambos puntajes deben ser números enteros positivos.");
                return;
              }
              if (num1 === num2) {
                alert("No se permiten empates en este torneo.");
                return;
              }
              let ganador = "";
              if (num1 > num2) {
                ganador = partido.jugador1;
              } else if (num2 > num1) {
                ganador = partido.jugador2;
              }
              if (ganador && rondas[idxRonda + 1]) {
                rondas[idxRonda + 1].forEach((p) => {
                  if (p.jugador1 === `Ganador partido ${partido.id}`)
                    p.jugador1 = ganador;
                  if (p.jugador2 === `Ganador partido ${partido.id}`)
                    p.jugador2 = ganador;
                });
              }
              // Muestra el resultado como texto
              let texto = "";
              if (num1 > num2) {
                texto = `Ganó <strong>${partido.jugador1}</strong> - ${num1} - ${num2}`;
              } else {
                texto = `Ganó <strong>${partido.jugador2}</strong> - ${num1} - ${num2}`;
              }
              resultadoBox.innerHTML = texto;
              partido.resultado = `${num1} - ${num2}`;
              partido.ganador = ganador;
              // Volver a renderizar el bracket para reflejar el cambio en la siguiente ronda
              const contenedor = document.getElementById("bracket-container");
              contenedor.innerHTML = "";
              contenedor.appendChild(renderBracketSE(rondas));
            };

            resultadoBox.innerHTML = "";
            resultadoBox.appendChild(input1);
            resultadoBox.appendChild(span);
            resultadoBox.appendChild(input2);
            resultadoBox.appendChild(btn);
            input1.focus();
          };
        }, 0);
      });
      rondaDiv.appendChild(row);
      container.appendChild(rondaDiv);
    });
    return container;
  }

  function renderListaPartidosRR(tablaPartidos) {
    const container = document.createElement("div");
    container.innerHTML =
      "<h4 class='mt-4'>Lista de Partidos (Round Robin)</h4>";
    const ul = document.createElement("ul");
    for (let i = 0; i < tablaPartidos.length; i++) {
      for (let j = i + 1; j < tablaPartidos[i].length; j++) {
        const partido = tablaPartidos[i][j];
        if (partido) {
          const li = document.createElement("li");
          li.textContent = `${partido.jugador1} vs ${partido.jugador2} ${partido.resultado ? "- " + partido.resultado : ""}`;
          ul.appendChild(li);
        }
      }
    }
    container.appendChild(ul);
    return container;
  }
});
