const buttons = document.getElementsByClassName('btn');
const visor = document.getElementById('visor');
const historico_storage = localStorage.getItem('historico')
const btnLimparHistorico = document.getElementById('btnLimparHistorico')

let valor_botao;
let valor_final;

window.addEventListener('load', function(){
    const list = getHistorico()
    console.log(list)
    for (item of list) {
        addHistorico(item)
    }
})

let addHistorico = function(text){
    const historico = document.getElementById("historico")

    const novo_calculo = document.createElement("p") 
    novo_calculo.textContent  = text
    historico.appendChild(novo_calculo)
}


for (btn of buttons) {
    btn.addEventListener('click', function(){
        valor_botao = this.textContent

        if (valor_botao === 'C') {
            visor.textContent = "";   
        } else if(valor_botao === '=') {
            let expressao = visor.textContent
            valor_final = eval(visor.textContent)
            visor.textContent = eval(valor_final)
                        
            addHistorico(expressao +" = "+visor.textContent)
            addItemNoHistorico(expressao +" = "+visor.textContent)
        } else {
            visor.textContent += valor_botao
        }
    })
}

function addItemNoHistorico(texto) {
    var list = getHistorico()
    list.push(texto)
    localStorage.setItem('historico', JSON.stringify(list))

}

function getHistorico() {
    const list  = localStorage.getItem('historico')
    if (list !== null) {
        return JSON.parse(list)
    } else {
        return []
    }
}

const limparHistorico = function(){
    historico.textContent="";
    localStorage.removeItem('historico')
}

btnLimparHistorico.addEventListener('click', limparHistorico);




