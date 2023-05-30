window.currRole = null; // variable globale pour stocker le rôle actuel

function selectRole(role, element, state) {
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

	for (let i = 1; i < 4; i++)
        appendsOptionsToId(`${state}${i}`, createOptionsChamps("Default", role))

    // Appeler la fonction doAllStats pour mettre à jour les statistiques et l'affichage
    if (state !== "favFirst") {
        doAllStats();
        applyFormat(role)
    }
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
    const favChamp = [];
    favChamp.push(document.querySelector('#fav1').value);
    favChamp.push(document.querySelector('#fav2').value);
    favChamp.push(document.querySelector('#fav3').value);
    
    fav1.value = favChamp[0];
    fav2.value = favChamp[1];
    fav3.value = favChamp[2];
    
    const championName = fav1.value;
    const imageUrl1 = `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${championName}.png`;
    const championName2 = favChamp[1];
    const imageUrl2 = `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${championName2}.png`;
    const championName3 = favChamp[2];
    const imageUrl3 = `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${championName3}.png`;
    
    if (championName !== "Default") {
        const championImage = document.querySelector('.imgc2');
        championImage.src = imageUrl1;
        championImage.alt = championName;
    }

    if (championName2 !== "Default") {
        const championImage2 = document.querySelector('.imgc3');
        championImage2.src = imageUrl2;
        championImage2.alt = championName2;
    }
    
    if (championName3 !== "Default") {
        const championImage3 = document.querySelector('.imgc4');
        championImage3.src = imageUrl3;
        championImage3.alt = championName3;
    }

    
    let imageUrlv1 = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_0.jpg`;
    let imageUrlv2 = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName2}_0.jpg`;
    let imageUrlv3 = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName3}_0.jpg`;



    /*-----------------------------------------------------	*/
        
    let originalImageUrl = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Pyke_0.jpg";
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    // Chargement des images
    let originalImage = new Image();
    let image1 = new Image();
    let image2 = new Image();
    let image3 = new Image();

    let imagesLoaded = 0;

    // Callback lorsque toutes les images sont chargées
    let onAllImagesLoaded = () => {
    // Réglage des dimensions du canvas
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;

    // Calculez le nombre de champions sélectionnés
    let numChampions = 0;
    if (championName !== "Default") numChampions++;
    if (championName2 !== "Default") numChampions++;
    if (championName3 !== "Default") numChampions++;

    if (numChampions === 0) {
        // Aucun champion sélectionné, on laisse le fond noir
        return;
    }

    // Dessin des images coupées en fonction du nombre de champions sélectionnés
    if (numChampions === 1) {
        ctx.drawImage(image1, 0, 0, image1.width, image1.height, 0, 0, originalImage.width, originalImage.height);
    } else if (numChampions === 2) {
        let cropWidth1 = image1.width / 4;
        let cropWidth2 = image2.width / 4;

        ctx.drawImage(image1, cropWidth1, 0, image1.width / 2, image1.height, 0, 0, originalImage.width / 2, originalImage.height);
        ctx.drawImage(image2, cropWidth2, 0, image2.width / 2, image2.height, originalImage.width / 2, 0, originalImage.width / 2, originalImage.height);
    } else {
        let cropWidth1 = image1.width / 3;
        let cropWidth2 = image2.width / 3;
        let cropWidth3 = image3.width / 3;

        ctx.drawImage(image1, cropWidth1, 0, cropWidth1, image1.height, 0, 0, originalImage.width / 3, originalImage.height);
        ctx.drawImage(image2, cropWidth2, 0, cropWidth2, image2.height, originalImage.width / 3, 0, originalImage.width / 3, originalImage.height);
        ctx.drawImage(image3, cropWidth3, 0, cropWidth3, image3.height, (originalImage.width / 3) * 2, 0, originalImage.width / 3, originalImage.height);
    }

    // récupère quel rôle change pour savoir ou modifier l'image
    const roleOrder = ['Top', 'Jungle', 'Mid', 'ADC', 'Support'];
    const imageIds = ['a1-img', 'a2-img', 'a3-img', 'a4-img', 'a5-img'];
    const index = roleOrder.indexOf(window.currRole);
    // Remplacement de l'image originale par le résultat du canvas
    let finalImageUrl = canvas.toDataURL();
    let originalImageElement = document.getElementById(imageIds[index]);
    originalImageElement.src = finalImageUrl;
    };

    // Fonction pour gérer le chargement des images
    let numChampions = favChamp.filter(champ => champ !== "Default").length;
    let totalImagesToLoad = 1 + numChampions; // 1 pour l'image originale et le reste pour les champions sélectionnés

    let onImageLoad = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImagesToLoad) {
        onAllImagesLoaded();
    }
    };

    // Configuration et chargement des images
    originalImage.crossOrigin = "anonymous";
    originalImage.src = originalImageUrl;
    originalImage.onload = onImageLoad;

    if (championName !== "Default") {
    image1.crossOrigin = "anonymous";
    image1.src = imageUrlv1;
    image1.onload = onImageLoad;
    }

    if (championName2 !== "Default") {
    image2.crossOrigin = "anonymous";
    image2.src = imageUrlv2;
    image2.onload = onImageLoad;
    }

    if (championName3 !== "Default") {
    image3.crossOrigin = "anonymous";
    image3.src = imageUrlv3;
    image3.onload = onImageLoad;
    }

    doAllStats();
}