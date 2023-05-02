function autocomplete(inp, arr) {
    var currentFocus;

    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
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
            }
        }
    });

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
    console.log(element.value)
    champs[champs.findIndex(a => a.id === element.id)].name = element.value

    let img = document.querySelector(`#${element.id}-img`)
    if (element.value === "") {
        img.src = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg'
        img.classList.add('champback')
        img.classList.remove('champActive')
    } else {
        img.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${element.value}_0.jpg`

        // Ajoutez la classe 'champActive' et supprimez la classe 'champback'
        img.classList.remove('champback');
        img.classList.add('champActive');
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