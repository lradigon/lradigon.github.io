function isFavIsCorrect(fav) {
    return fav != "Default" && fav != undefined && fav != ""
}

function getNbFavChamps() {
    let res = 0
    for (let i = 0; i < champsFav[currRole].length; i++)
        if (isFavIsCorrect(champsFav[currRole][i]))
            res++
    return res
}

function modifySplashArtFav() {
    let nbFavChamps = getNbFavChamps()

	let canvas = document.createElement("canvas")
	let ctx = canvas.getContext("2d")



    let originalImage = new Image()
    originalImage.crossOrigin = "anonymous";
	originalImage.src = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Pyke_0.jpg"
    originalImage.onload = () => {
        let currImagesLoaded = 0
        let onImageLoad = () => {
            currImagesLoaded++
            if (currImagesLoaded === nbFavChamps) {
                onAllImagesLoaded()
            }
        }

        let images = []
        for (let i = 0; i < champsFav[currRole].length; i++) {
            if (isFavIsCorrect(champsFav[currRole][i])) {
                let image = new Image()
                image.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champsFav[currRole][i]}_0.jpg`
                image.alt = champsFav[currRole][i]
                image.crossOrigin = "anonymous"
                image.onload = onImageLoad
                images.push(image)
            }
        }

        let onAllImagesLoaded = () => {
            canvas.width = originalImage.width;
            canvas.height = originalImage.height;
    
            for (let i = 0; i < nbFavChamps; i++) {
                let cropWidths = [0, images[i].width / 4, images[i].width / 3]
                let oiWidths   = [0, originalImage.width / nbFavChamps, (originalImage.width / nbFavChamps) * 2]
    
                ctx.drawImage(
                    images[i], 
                    cropWidths[nbFavChamps - 1],
                    0,
                    images[i].width  / nbFavChamps,
                    images[i].height,
                    oiWidths[i],
                    0,
                    originalImage.width / nbFavChamps,
                    originalImage.height
                )
            }
    
            let finalImageUrl = canvas.toDataURL()
            document.querySelector(`.${currRole}`).src = finalImageUrl
        }
    }
}

function resetSplashArts() {
    for (let key in baseSplashArt) {
        const img = document.querySelector(`#${key}`)

        if (!img.classList.contains('champActive') || img.classList.contains(currRole)) {
            img.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${baseSplashArt[key]}_0.jpg`
            img.alt = baseSplashArt[key]
        }
    }

    let autocompleteReset = document.querySelector(`#${roleIndexs[currRole]}`)
    const inputEvent = new Event('input', {bubbles: true})
    autocompleteReset.value = ""
    autocompleteReset.dispatchEvent(inputEvent)

    modifySplashArtFav()
}

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

    for (let i = 0; i < 3; i++) {
        if (isFavIsCorrect(champsFav[currRole][i]))
            appendsOptionsToId(`fav${i + 1}`, createOptionsChamps(champsFav[currRole][i], currRole))
        else
            appendsOptionsToId(`fav${i + 1}`, createOptionsChamps("Default", currRole))
    }

    doAllStats()
    applyFormat(role)
    resetSplashArts()
}

function appendsOptionsToId(id, options) {
    let element = document.querySelector(`#${id}`);
    element.style.width = "120px"; // Ajoutez le style ici
    element.innerHTML = '';
    for (let i = 0; i < options.length; i++) {
        element.appendChild(options[i]);
    }
}

// Ajoutez un paramètre `roleFilter` à la fonction
function createOptionsChamps(defaultSelected, roleFilter) {
    let options = []
    for (let i = 0; i < champ.length; i++) {
        // Vérifiez si le rôle du champion correspond au rôle spécifié
        if (champ[i].role === roleFilter) {
            let option = document.createElement('option')
            option.style.width = "200px";  // Ajoutez le style directement ici
            option.style.overflow = "hidden";
            option.value = champ[i].name
            option.innerText = champ[i].name
            if (defaultSelected == champ[i].name)
                option.selected = true
            
            options.push(option)
        }
    }

    if (defaultSelected == "Default") {
        let option = document.createElement('option')
        option.style.width = "200px";  // Ajoutez le style ici aussi
        option.style.overflow = "hidden";
        option.value = "Default"
        option.innerText = "-"
        option.selected = true
        options.push(option)
    }
    return options
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
        inputElement.parentElement.parentElement.style.display = 'none';
    }
}

function changeImageChampFav() {
    modifySplashArtFav()
    doAllStats();
}