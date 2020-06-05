function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    console.log(event.target.value)
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json()) /*função anonima retornando valor */
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })
}
document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities)


//Itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem) //Ouve o click do mouse e chama a função hand
}
const collectedItems = document.querySelector("input[name=items")
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    //.adicionar  ou remover uma classe com js
    itemLi.classList.toggle("selected") /*toggle adiciona ou remove a class selected*/

    const itemId = itemLi.dataset.id

    //verifica se existem itens slecionados, 
    //se sim pegar os itens selecionados.
    // const alredySelected = selectedItems.findIndex( item => item == itemId ) //Com função reduzida.
    const alreadySelected = selectedItems.findIndex(function (item) { // função completa.
        const itemFound = item == itemId
        console.log("Item ID: ", itemId)
        return itemFound
    })

    //Se já estiver selecionado, tirar da seleção
    if (alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems /*Atualiza o array de dados selecionados*/
    }
    //Se não estiver selecionado adicionado, adicionar à seleção.
    else {
        selectedItems.push(itemId)
    }
    console.log('selectedItems: ', selectedItems)
    //atualizar  o campo escondido com os itens selecionado.
    collectedItems.value = selectedItems


}
