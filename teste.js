const registros = []; // lista principal

function calcularMedia(notas) {
    if (!notas || notas.length === 0) return 0;

    let soma = 0;
    let i = 0;
    while (i < notas.length) {
        soma = soma + notas[i];
        i = i + 1;
    }
    return soma / notas.length;
}

function adicionarAluno() {
    const nome = prompt("Informe o nome do estudante:");
    if (!nome || nome.trim() === "") {
        alert("Nome inválido!");
        return;
    }

    let existe = false;
    let i = 0;
    while (i < registros.length) {
        if (registros[i].apelido.toLowerCase() === nome.trim().toLowerCase()) {
            existe = true;
        }
        i = i + 1;
    }

    if (existe) {
        alert(`O estudante "${nome}" já está cadastrado!`);
        return;
    }

    const novo = { apelido: nome.trim(), notas: [] };
    registros[registros.length] = novo;

    alert(`Estudante "${novo.apelido}" cadastrado!`);
}

function listarAlunos() {
    if (registros.length === 0) {
        alert("Nenhum estudante cadastrado.");
        return;
    }

    let lista = "Estudantes cadastrados:\n";
    let i = 0;
    while (i < registros.length) {
        let aluno = registros[i];

        let notasTxt = "";
        if (aluno.notas.length === 0) {
            notasTxt = "Sem notas";
        } else {
            let j = 0;
            while (j < aluno.notas.length) {
                notasTxt = notasTxt + aluno.notas[j];
                if (j < aluno.notas.length - 1) {
                    notasTxt = notasTxt + ", ";
                }
                j = j + 1;
            }
        }

        let media = calcularMedia(aluno.notas).toFixed(2);
        lista = lista + "Nome: " + aluno.apelido + " | Notas: " + notasTxt + " | Média: " + media + "\n";

        i = i + 1;
    }

    alert(lista);
}

function registrarNotas() {
    const nome = prompt("Nome do estudante:");
    if (!nome) {
        alert("Nome inválido!");
        return;
    }

    let estudante = null;
    let i = 0;
    while (i < registros.length) {
        if (registros[i].apelido.toLowerCase() === nome.toLowerCase()) {
            estudante = registros[i];
        }
        i = i + 1;
    }

    if (!estudante) {
        alert("Estudante não encontrado!");
        return;
    }

    const entrada = prompt("Digite as notas separadas por vírgula:");
    if (!entrada) {
        alert("Nenhuma nota informada!");
        return;
    }

    let notasTemp = [];
    let num = "";
    let j = 0;
    while (j <= entrada.length) {
        let ch = entrada[j];
        if (ch === "," || j === entrada.length) {
            if (num.trim() !== "") {
                let valor = parseFloat(num.trim());
                if (isNaN(valor) || valor < 0 || valor > 10) {
                    alert("Notas inválidas, devem estar entre 0 e 10.");
                    return;
                }
                notasTemp[notasTemp.length] = valor;
            }
            num = "";
        } else {
            num = num + ch;
        }
        j = j + 1;
    }

    let k = 0;
    while (k < notasTemp.length) {
        estudante.notas[estudante.notas.length] = notasTemp[k];
        k = k + 1;
    }

    alert("Notas adicionadas!");
}

function calcularMediaAluno() {
    const nome = prompt("Nome do estudante:");
    if (!nome) {
        alert("Nome inválido!");
        return;
    }

    let aluno = null;
    let i = 0;
    while (i < registros.length) {
        if (registros[i].apelido.toLowerCase() === nome.toLowerCase()) {
            aluno = registros[i];
        }
        i = i + 1;
    }

    if (!aluno) {
        alert("Estudante não encontrado!");
        return;
    }

    if (aluno.notas.length === 0) {
        alert("Esse estudante não tem notas!");
        return;
    }

    let media = calcularMedia(aluno.notas);
    alert("A média de " + aluno.apelido + " é " + media.toFixed(2));
}

function mostrarAprovados() {
    if (registros.length === 0) {
        alert("Nenhum estudante cadastrado.");
        return;
    }

    let aprovados = "";
    let i = 0;
    while (i < registros.length) {
        if (registros[i].notas.length > 0) {
            let media = calcularMedia(registros[i].notas);
            if (media >= 7) {
                aprovados = aprovados + registros[i].apelido + " | Média: " + media.toFixed(2) + "\n";
            }
        }
        i = i + 1;
    }

    if (aprovados === "") {
        alert("Nenhum aprovado ainda.");
    } else {
        alert("Aprovados:\n" + aprovados);
    }
}

function estatisticaTurma() {
    if (registros.length === 0) {
        alert("Nenhum estudante cadastrado.");
        return;
    }

    let somaMedias = 0;
    let qtd = 0;
    let maior = -1;
    let menor = 11;

    let i = 0;
    while (i < registros.length) {
        if (registros[i].notas.length > 0) {
            let m = calcularMedia(registros[i].notas);
            somaMedias = somaMedias + m;
            qtd = qtd + 1;
            if (m > maior) maior = m;
            if (m < menor) menor = m;
        }
        i = i + 1;
    }

    if (qtd === 0) {
        alert("Nenhum estudante tem notas!");
        return;
    }

    let mediaTurma = somaMedias / qtd;
    alert(
        "Resumo da turma:\n" +
        "Total: " + registros.length + "\n" +
        "Com notas: " + qtd + "\n" +
        "Média geral: " + mediaTurma.toFixed(2) + "\n" +
        "Maior média: " + maior.toFixed(2) + "\n" +
        "Menor média: " + menor.toFixed(2)
    );
}

function ordenarPorMedia() {
    // cópia simples dos alunos com médias
    let alunosComMedia = [];
    let i = 0;
    while (i < registros.length) {
        if (registros[i].notas.length > 0) {
            alunosComMedia[alunosComMedia.length] = {
                nome: registros[i].apelido,
                media: calcularMedia(registros[i].notas)
            };
        }
        i = i + 1;
    }

    if (alunosComMedia.length === 0) {
        alert("Nenhum estudante tem notas!");
        return;
    }

    // bubble sort
    let trocou = true;
    while (trocou) {
        trocou = false;
        let j = 0;
        while (j < alunosComMedia.length - 1) {
            if (alunosComMedia[j].media < alunosComMedia[j + 1].media) {
                let temp = alunosComMedia[j];
                alunosComMedia[j] = alunosComMedia[j + 1];
                alunosComMedia[j + 1] = temp;
                trocou = true;
            }
            j = j + 1;
        }
    }

    let lista = "Ranking:\n";
    let k = 0;
    while (k < alunosComMedia.length) {
        lista = lista + (k + 1) + ") " + alunosComMedia[k].nome + " | Média: " + alunosComMedia[k].media.toFixed(2) + "\n";
        k = k + 1;
    }

    alert(lista);
}

function removerAluno() {
    if (registros.length === 0) {
        alert("Nenhum estudante cadastrado.");
        return;
    }

    const nome = prompt("Digite o nome para remover:");
    if (!nome) {
        alert("Operação cancelada.");
        return;
    }

    let pos = -1;
    let i = 0;
    while (i < registros.length) {
        if (registros[i].apelido.toLowerCase() === nome.toLowerCase()) {
            pos = i;
        }
        i = i + 1;
    }

    if (pos === -1) {
        alert("Estudante não encontrado!");
        return;
    }

    if (confirm("Remover " + registros[pos].apelido + "?")) {
        // deslocando manualmente
        let j = pos;
        while (j < registros.length - 1) {
            registros[j] = registros[j + 1];
            j = j + 1;
        }
        registros.length = registros.length - 1;
        alert("Estudante removido!");
    }
}

(function menu() {
    let ativo = true;
    while (ativo) {
        const op = prompt(
"--- MENU ---\n" +
"1) Adicionar estudante\n" +
"2) Listar estudantes\n" +
"3) Registrar notas\n" +
"4) Calcular média individual\n" +
"5) Mostrar aprovados\n" +
"6) Estatísticas da turma\n" +
"7) Ordenar por média\n" +
"8) Remover estudante\n" +
"9) Sair\n"
        );

        if (op === null) break;

        if (op === "1") adicionarAluno();
        else if (op === "2") listarAlunos();
        else if (op === "3") registrarNotas();
        else if (op === "4") calcularMediaAluno();
        else if (op === "5") mostrarAprovados();
        else if (op === "6") estatisticaTurma();
        else if (op === "7") ordenarPorMedia();
        else if (op === "8") removerAluno();
        else if (op === "9") ativo = false;
        else alert("Opção inválida!");
    }

    alert("Encerrando...");
})();