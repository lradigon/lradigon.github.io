function changeFocus(currId) {
    const order = ["a1", "e1", "a2", "e2", "a3", "e3", "a4", "e4", "a5", "e5"]

    for (let i = 0; i < order.length - 1; i++) {
        if (order[i] == currId) {
            let nextInput = document.querySelector(`#${order[i + 1]}`)
            if (nextInput.parentElement.parentElement.style.display == 'none')
                nextInput = document.querySelector(`#${order[i + 2]}`);
            nextInput.focus()
            return;
        }
    }

}

function autocomplete(inp, arr) {
    var currentFocus;
	var val = '';
	
    inp.addEventListener("input", function(e) {
        var a, b, i = this.value;
		val = this.value;

        if (val === "") {
            closeAllLists()
            modifyOption(inp)
        }
		
        closeAllLists();
        if (!val) {return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.style.display = "grid"
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase() && !isChampSelected(arr[i])) {
                div = document.createElement("div");
                div.style.display = "flex"
                div.style.alignItems = "center"

                img = document.createElement("img")
                img.src = `./icones/${arr[i]}.webp`
                img.alt = arr[i]
                img.width = 40
                div.appendChild(img)

                span = document.createElement("span")
                span.style.textAlign = "left"
                span.style.paddingLeft = "1vw"
                span.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                span.innerHTML += arr[i].substr(val.length);
                span.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                div.appendChild(span)

                div.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                    modifyOption(inp)
                    changeFocus(inp.id)
                });
                a.appendChild(div);
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

    document.addEventListener("click", function(e) {
        closeAllLists(e.target)
    });
}

//Mets à jour l'image du champion quand il est selectionné
function modifyOption(element) {
    champs[champs.findIndex(a => a.id === element.id)].name = element.value
    const champsMaxId = champs.reduce((max, curr) => curr.pickId > max.pickId ? curr : max, champs[0]).pickId
    champs[champs.findIndex(a => a.id === element.id)].pickId   = champsMaxId + 1

    const img = document.querySelector(`#${element.id}-img`)
    const questionmark = document.querySelector(`#qm-${element.id}`)

    if (element.value === "") {
        img.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${baseSplashArt[`${element.id}-img`]}_0.jpg`
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