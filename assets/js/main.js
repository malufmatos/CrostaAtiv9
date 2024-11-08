const transformarLetraEmNumero = letra => letra.charCodeAt(0) - 65;
const transformarNumeroEmLetra = numero => String.fromCharCode(numero + 65);

const codificarVigenere = (texto, chave) => {
    texto = texto.toUpperCase();
    chave = chave.toUpperCase();
    let textoCodificado = [];

    while (chave.length < texto.length) chave += chave;
    chave = chave.slice(0, texto.length);

    for (let i = 0; i < texto.length; i++) {
        let letraCodificada = (transformarLetraEmNumero(texto[i]) + transformarLetraEmNumero(chave[i])) % 26;
        textoCodificado.push(transformarNumeroEmLetra(letraCodificada));
    }

    return textoCodificado.join('');
};
async function decodificarVigenere(codigo, chave) {
    try {
        const response = await fetch("https://desafio9.onrender.com/decrypt_message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "encrypted_message": codigo,
                "keyword": chave
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Mensagem criptografada e palavra-chave são obrigatórias."');
        } else {
            const data = await response.json();
            alert('A chave foi criptografada com sucesso!');
            return data.decrypted_message;
        }

    } catch (error) {
        console.error('Erro:', error);
        alert(error.message);
        return '';
    }
}

async function cifraVigenere(){
    const texto = document.getElementById('input-texto').value;
    const chave = document.getElementById('chave').value;
    const operacao = document.getElementById('operacao').value;
    let resultado = '';


    if (operacao === 'codificar') {
        resultado = codificarVigenere(texto, chave);
    } else if (operacao === 'decodificar') {
        resultado =  await decodificarVigenere(texto, chave);
    }

    document.getElementById('resultado').innerText = resultado;
};

function limparCampos(){
    document.getElementById('input-texto').value = '';
    document.getElementById('chave').value = '';
    document.getElementById('resultado').innerText = '';
}