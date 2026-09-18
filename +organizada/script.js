
// =====================================
// CADERNO
// =====================================

let paginaAtual = 1;

let paginas = [
    "Hoje é um bom dia para fazer acontecer! ♡",
    "",
    "",
    "",
    ""
];

const textoPagina = document.getElementById("textoPagina");
const numeroPagina = document.getElementById("numeroPagina");

const paginaSalva = localStorage.getItem("paginasCaderno");

if (paginaSalva) {
    paginas = JSON.parse(paginaSalva);
}

function mostrarPagina() {

    textoPagina.innerText = paginas[paginaAtual - 1];

    numeroPagina.innerText =
        paginaAtual + " / " + paginas.length;
}

function salvarPagina() {

    paginas[paginaAtual - 1] =
        textoPagina.innerText;

    localStorage.setItem(
        "paginasCaderno",
        JSON.stringify(paginas)
    );
}

document
    .getElementById("proximo")
    .addEventListener("click", function() {

        salvarPagina();

        if (paginaAtual < paginas.length) {
            paginaAtual++;
            mostrarPagina();
        }

    });

document
    .getElementById("anterior")
    .addEventListener("click", function() {

        salvarPagina();

        if (paginaAtual > 1) {
            paginaAtual--;
            mostrarPagina();
        }

    });

document
    .querySelectorAll(".abas button")
    .forEach(function(botao) {

        botao.addEventListener("click", function() {

            salvarPagina();

            paginaAtual =
                Number(this.dataset.pagina);

            mostrarPagina();

        });

    });

textoPagina.addEventListener("input", salvarPagina);

mostrarPagina();


// =====================================
// TAREFAS
// =====================================

let tarefas =
    JSON.parse(localStorage.getItem("tarefas")) || [];

const inputTarefa =
    document.getElementById("novaTarefa");

const botaoAdicionar =
    document.getElementById("adicionar");

const listaTarefas =
    document.getElementById("listaTarefas");


function salvarTarefas() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}


function mostrarTarefas() {

    listaTarefas.innerHTML = "";

    tarefas.forEach(function(tarefa, indice) {

        const item = document.createElement("li");

        const label = document.createElement("label");

        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked =
            tarefa.concluida;

        const texto =
            document.createElement("span");

        texto.innerText =
            tarefa.texto;

        checkbox.addEventListener(
            "change",
            function() {

                tarefas[indice].concluida =
                    checkbox.checked;

                salvarTarefas();

            }
        );

        label.appendChild(checkbox);
        label.appendChild(texto);


        const remover =
            document.createElement("button");

        remover.innerText = "×";
        remover.className = "remover";

        remover.addEventListener(
            "click",
            function() {

                tarefas.splice(indice, 1);

                salvarTarefas();
                mostrarTarefas();

            }
        );


        item.appendChild(label);
        item.appendChild(remover);

        listaTarefas.appendChild(item);

    });
}


function adicionarTarefa() {

    const texto =
        inputTarefa.value.trim();

    if (texto === "") {
        return;
    }

    tarefas.push({
        texto: texto,
        concluida: false
    });

    inputTarefa.value = "";

    salvarTarefas();
    mostrarTarefas();
}


botaoAdicionar.addEventListener(
    "click",
    adicionarTarefa
);


inputTarefa.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            adicionarTarefa();
        }

    }
);


mostrarTarefas();


// =====================================
// POST-ITS
// =====================================

let postits =
    JSON.parse(localStorage.getItem("postits")) || [];

const inputPostit =
    document.getElementById("textoPostit");

const botaoPostit =
    document.getElementById("adicionarPostit");

const listaPostits =
    document.getElementById("listaPostits");


function salvarPostits() {

    localStorage.setItem(
        "postits",
        JSON.stringify(postits)
    );
}


function mostrarPostits() {

    listaPostits.innerHTML = "";

    postits.forEach(function(postit, indice) {

        const div =
            document.createElement("div");

        div.className = "postit";

        const texto =
            document.createElement("span");

        texto.innerText =
            postit;

        const remover =
            document.createElement("button");

        remover.innerText = "×";

        remover.addEventListener(
            "click",
            function() {

                postits.splice(indice, 1);

                salvarPostits();
                mostrarPostits();

            }
        );

        div.appendChild(texto);
        div.appendChild(remover);

        listaPostits.appendChild(div);

    });
}


function adicionarPostit() {

    const texto =
        inputPostit.value.trim();

    if (texto === "") {
        return;
    }

    postits.push(texto);

    inputPostit.value = "";

    salvarPostits();
    mostrarPostits();
}


botaoPostit.addEventListener(
    "click",
    adicionarPostit
);


inputPostit.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            adicionarPostit();
        }

    }
);


mostrarPostits();


// =====================================
// FOTOS
// =====================================

function carregarFoto(inputId, fotoId, storageId) {

    const input =
        document.getElementById(inputId);

    const foto =
        document.getElementById(fotoId);

    const imagemSalva =
        localStorage.getItem(storageId);

    if (imagemSalva) {

        foto.innerHTML =
            '<img src="' + imagemSalva + '">';

    }

    input.addEventListener(
        "change",
        function() {

            const arquivo =
                input.files[0];

            if (!arquivo) {
                return;
            }

            const leitor =
                new FileReader();

            leitor.onload = function(event) {

                const imagem =
                    event.target.result;

                foto.innerHTML =
                    '<img src="' + imagem + '">';

                localStorage.setItem(
                    storageId,
                    imagem
                );

            };

            leitor.readAsDataURL(arquivo);

        }
    );
}


carregarFoto(
    "upload1",
    "foto1",
    "fotoSalva1"
);

carregarFoto(
    "upload2",
    "foto2",
    "fotoSalva2"
);

