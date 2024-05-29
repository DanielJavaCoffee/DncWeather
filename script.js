const nome = document.getElementById('nome')
const email = document.getElementById('email')
const cep = document.getElementById('cep')
const latitude = document.getElementById('latitude')
const longitude = document.getElementById('longitude')

const logradouro = document.getElementById('logradouro')
const bairro = document.getElementById('bairro')
const localidade = document.getElementById('localidade')

const buscarCep = document.getElementById('buscarCep')

const respostaHtml = document.getElementById('resposta')
const temperatura = document.getElementById('temperatura')


function verificarCampos() {
    const campos = [nome, email, cep, latitude, longitude];
    let todosPreenchidos = true;

    campos.forEach(campo => {
        if (!campo.value.trim()) {
            todosPreenchidos = false;
        } 
    });

    if (!todosPreenchidos) {
        alert('Por favor, preencha todos os campos.');
    } 
    return todosPreenchidos;
}

async function buscarDados(){
    try {
        if(verificarCampos()){
            buscarTempo()
            const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
            if(!response.ok){
                throw new Error('Erro na requesção')
            }
            const dados = await response.json()
            console.log(dados)
            respostaHtml.classList.remove('oculto');
            respostaHtml.classList.add('visivel');
            logradouro.innerHTML = dados.logradouro
            bairro.innerHTML = dados.bairro
            localidade.innerHTML = dados.localidade
        }
    } catch (error) {
       
    }
}

async function buscarTempo(){
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude.value}&longitude=${longitude.value}&hourly=temperature_2m,rain`)
        if(!response.ok){
            throw new Error('Erro na requesição')
        }
        const dados = await response.json()
        console.log(dados)
        temperatura.innerHTML = `Previsão de tempo de acordo com a região: ${dados.hourly.temperature_2m[0]}° C`

    } catch (error) {

    }
}