// Recupere le nom des champions pour en faire une liste à intégrer sous les images (sous les champs favoris aussi peut être)
function createOptionsChamps(defaultSelected) {
    let options = []
    for (let i = 0; i < champ.length; i++) {
        let option = document.createElement('option')
        option.value = champ[i].name
        option.innerText = champ[i].name

        if (defaultSelected == champ[i].name)
            option.selected = true
        
        options.push(option)
    }

    if (defaultSelected == "Default") {
        let option = document.createElement('option')
        option.value = "Default"
        option.innerText = "-"
        option.selected = true
        options.push(option)
    }

    return options
}
// ???
function appendsOptionsToId(id, options) {
    let element = document.querySelector(`#${id}`)
    for (let i = 0; i < options.length; i++)
        element.appendChild(options[i])
}