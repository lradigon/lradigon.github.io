function selectRolePopup(role, element) {
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
        appendsOptionsToId(`favFirst${i}`, createOptionsChamps("Default", role))
}

// Fait scintiller les rôles quand aucun est choisi
function makeRoleTwinkle() {
	const images = document.querySelectorAll('.role-image');

	images.forEach((image) => {
		image.classList.add('scintillante');
	});

	setTimeout(() => {
		images.forEach((image) => {
			image.classList.remove('scintillante');
		});
	}, 1740);
}

function FirstApplication() {
	if (currRole == null) {
		makeRoleTwinkle()
		return;
	}
	
	// Sélectionner l'image du role correspondante du deuxième groupe d'images
    const docRole = document.querySelector(`#${currRole}`);
    docRole.children[0].classList.add("selected")


	for (let i = 0; i < 3; i++) {
		if (isFavIsCorrect(champsFav[currRole][i]))
			appendsOptionsToId(`fav${i + 1}`, createOptionsChamps(champsFav[currRole][i], currRole))
		else
			appendsOptionsToId(`fav${i + 1}`, createOptionsChamps("Default", currRole))
	}
	applyFormat(currRole)


	for (let i = 0; i < champsFav[currRole].length; i++) {
		if (isFavIsCorrect(champsFav[currRole][i])) {
			document.querySelector(`.imgc${i + 2}`).src = `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${champsFav[currRole][i]}.png`;
			document.querySelector(`.imgc${i + 2}`).alt = champsFav[currRole][i] 
		}
	}

	modifySplashArtFav()

	// Delete le contenu du popupstart
	document.getElementById("role-images2").remove()
	document.getElementById("blur-background").remove()
	document.querySelector('#best-champ-res-none').style.display = "none"

    doAllStats();
}

function initializeSelect(id, defaultValue) {
    let selectElement = document.querySelector(`#${id}`);
    selectElement.style.width = "120px";

    let option = document.createElement('option');
    option.value = defaultValue;
    option.innerText = defaultValue;
    selectElement.appendChild(option);
}