export function sortearAmigoSecreto(participantes) {
    const lista = [...participantes];
    const sorteados = [...participantes];
    const resultado = [];

    for (const participante of lista) {
        const possiveis = sorteados.filter(p => p.nome !== participante.nome);
        if (possiveis.length === 0) {
            // Em caso de falha, reinicia
            return sortearAmigoSecreto(participantes);
        }

        const indice = Math.floor(Math.random() * possiveis.length);
        const escolhido = possiveis[indice];

        resultado.push({
            participanteId: participante.id,
            participanteNome: participante.nome,
            tirouNome: escolhido.nome,
            uuid: crypto.randomUUID(),
        });

        sorteados.splice(sorteados.indexOf(escolhido), 1);
    }

    return resultado;
}
