

function autocomplete(inp, arr) {
    var currentFocus;
	var val = '';

	
	
	
    inp.addEventListener("input", function(e) {

        var a, b, i = this.value;
		val = this.value;
		
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
		let suggestionsCount = 0; // Ajouter un compteur de suggestions
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase() && !isChampSelected(arr[i])) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                    console.log(inp)
                    modifyOption(inp)
                });
                a.appendChild(b);
				suggestionsCount++; // Incrémenter le compteur de suggestions
				singleSuggestion = b;
            }
        }
		// Si une seule suggestion est disponible et qu'elle est déjà visible, 
		// déclenchez l'événement de clic pour la sélectionner automatiquement
		if (suggestionsCount === 1) {
		  singleSuggestion.click();

		  // Obtenir le numéro du champ actuel
		  let currentNum = parseInt(inp.id.slice(1));
		  
		  // Obtenir le type du champ actuel ('a' ou 'e')
		  let currentType = inp.id.slice(0, 1);

		  let nextChamp;

		  do {
			// Si le type actuel est 'a', passez à 'e'
			if (currentType === 'a') {
			  currentType = 'e';
			}
			// Sinon, passez au numéro de champ suivant et revenez à 'a'
			else {
			  currentType = 'a';
			  currentNum++;
			}

			// Si nous avons dépassé '5', il n'y a pas de champ suivant
			if (currentNum > 5) {
			  return;
			}

			// Obtenir le champ suivant
			nextChamp = document.getElementById(currentType + currentNum.toString());

		  // Continuez à chercher si le champ suivant n'existe pas ou est déjà rempli
		  } while (!nextChamp || (nextChamp && nextChamp.value));

		  // Déplacer le focus vers le champ suivant
		  if (nextChamp) {
			nextChamp.focus();
			let currentType2 = inp.id.slice(0, 1);
			console.log(currentType2)
			console.log(currentType)
			if (currentType2 === currentType){
				console.log('egal')
				currentNum++;
				nextChamp = document.getElementById(currentType + currentNum.toString());
				nextChamp.focus();
		  }
		  }
		}
    });

//appuie sur retour
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) { // KEY DOWN
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) { // KEY UP
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) { // KEY ENTER
            e.preventDefault();
            if (currentFocus > -1)
                if (x) x[currentFocus].click();
        }
	// 8 is the keyCode for the backspace key
    if (e.keyCode == 8) {
		backspacePressed = true;
		inp.value = val;
		val = val.slice(0, -1); 
		console.log(val);
	    } else {
        backspacePressed = false;
    }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++)
            x[i].classList.remove("autocomplete-active");
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                let input = document.querySelector(`#${x[i].id.slice(0, 2)}`)
                let isAChamp = champ.findIndex(obj => obj.name.toLowerCase() === input.value.toLowerCase());

                if (input.value === "") {
                    input.value = ""
                    modifyOption(input)
                }
                if (isAChamp > 0) {
                    input.value = champ[isAChamp].name
                    modifyOption(input)
                }

                x[i].parentNode.removeChild(x[i])
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target)
    });
}

//Mets à jour l'image du champion quand il est selectionné
function modifyOption(element) {
    champs[champs.findIndex(a => a.id === element.id)].name = element.value

    const img = document.querySelector(`#${element.id}-img`)
    const questionmark = document.querySelector(`#qm-${element.id}`)

    if (element.value === "") {
        img.src = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg'
        img.classList.add('champback2')
        img.classList.remove('champActive')
        questionmark.style.display = "block"
    } else {
        img.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${element.value}_0.jpg`
        img.classList.remove('champback2')
        img.classList.add('champActive')
        questionmark.style.display = "none"
    }
    
    doAllStats()
}

function isChampSelected(champName) {
    let classAllies   = document.querySelectorAll('.allie')
    let classEnnemies = document.querySelectorAll('.ennemie')

    for (let i = 0; i < classAllies.length; i++)
        if (champName === classAllies[i].value)
            return true

    for (let i = 0; i < classEnnemies.length; i++)
        if (champName === classEnnemies[i].value)
            return true

    return false
}