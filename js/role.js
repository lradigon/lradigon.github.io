window.currRole = null; // variable globale pour stocker le rôle actuel

function selectRole(role, element) {
	
	    // ne rien faire si le rôle sélectionné est le même que le rôle actuel
    if (role === currRole) {
        return;
    }

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
	applyFormat(role)
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
	applyFormat(role)
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

function applyFormat(role) {
    const imageIds = ['a1-img', 'a2-img', 'a3-img', 'a4-img', 'a5-img'];
    const textIds = ['qm-a1', 'qm-a2', 'qm-a3', 'qm-a4', 'qm-a5'];
    const inputIds = ['a1', 'a2', 'a3', 'a4', 'a5'];
    const roleOrder = ['Top', 'Jungle', 'Mid', 'ADC', 'Support'];

    // Réinitialiser tous les éléments
    for (let i = 0; i < textIds.length; i++) {
        const textElement = document.getElementById(textIds[i]);
        textElement.classList.remove('you-text');
        textElement.textContent = '?';

        const inputElement = document.getElementById(inputIds[i]);
        inputElement.parentElement.parentElement.style.display = 'block';
    }

    // Appliquer le format souhaité à l'élément correspondant au rôle sélectionné
    const index = roleOrder.indexOf(role);
    if (index >= 0 && index < textIds.length) {
        const textElement = document.getElementById(textIds[index]);
        textElement.classList.add('you-text');
        textElement.textContent = 'YOU';

        const inputElement = document.getElementById(inputIds[index]);
		console.log('selectedInputElement:', inputElement);
        inputElement.parentElement.parentElement.style.display = 'none';
    }
}


