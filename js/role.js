function selectRole(role, element) {
    // Désélectionner toutes les images
    const images = document.getElementsByClassName("role-image");
    for (let i = 0; i < images.length; i++) {
        images[i].classList.remove("selected");
    }

    // Sélectionner l'image cliquée
    const selectedImage = element.children[0];
    selectedImage.classList.add("selected");

    currRole = role;
	
	appendsOptionsToId('fav1', createOptionsChamps("Default", role));
    appendsOptionsToId('fav2', createOptionsChamps("Default", role));
    appendsOptionsToId('fav3', createOptionsChamps("Default", role));

    // Appeler la fonction doAllStats pour mettre à jour les statistiques et l'affichage
    doAllStats();
}

function selectRole2(role, element) {
    // Désélectionner toutes les images
    const images = document.getElementsByClassName("role-image");
    for (let i = 0; i < images.length; i++) {
        images[i].classList.remove("selected");
    }
	
	// Sélectionner l'image cliquée
    const selectedImage = element.children[0];
    selectedImage.classList.add("selected");

    // Sélectionner l'image correspondante du deuxième groupe d'images
    const docRole = document.querySelector(`#${role}`);
    docRole.children[0].classList.add("selected")

    currRole = role

    appendsOptionsToId('favFirst1', createOptionsChamps("Default", role));
    appendsOptionsToId('favFirst2', createOptionsChamps("Default", role));
    appendsOptionsToId('favFirst3', createOptionsChamps("Default", role));
	appendsOptionsToId('fav1', createOptionsChamps("Default", role));
    appendsOptionsToId('fav2', createOptionsChamps("Default", role));
    appendsOptionsToId('fav3', createOptionsChamps("Default", role));
}



// Ajoutez un paramètre `roleFilter` à la fonction
function createOptionsChamps(defaultSelected, roleFilter) {
    let options = []
    for (let i = 0; i < champ.length; i++) {
        // Vérifiez si le rôle du champion correspond au rôle spécifié
        if (champ[i].role === roleFilter) {
            let option = document.createElement('option')
            option.value = champ[i].name
            option.innerText = champ[i].name
            if (defaultSelected == champ[i].name)
                option.selected = true
            
            options.push(option)
        }
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
    let element = document.querySelector(`#${id}`);
	element.innerHTML = '';
    for (let i = 0; i < options.length; i++) {
        element.appendChild(options[i]);
    }
}