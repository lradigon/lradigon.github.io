

// Fonction du calcul des stats pour les alliés et les ennemis sélectionnés 
function myFunction() {
    let classAllies   = document.querySelectorAll('.allie')
    let classEnnemies = document.querySelectorAll('.ennemie')

    let allies   = []
    let ennemies = []

    for (let i = 0; i < classAllies.length; i++)
        allies.push(classAllies[i].value)
    for (let i = 0; i < classEnnemies.length; i++)
        ennemies.push(classEnnemies[i].value)


    //let role = document.querySelector('#role').value
    if (typeof currRole === "undefined")
        return;

    let role = currRole
    
    let champInRole = []

    for (let i = 0; i < champ.length; i++)
        if (champ[i].role == role)
            champInRole.push(champ[i].name)


    let stats = []
    for (let i = 0; i < champInRole.length; i++)
        stats.push([])

    for (let i = 0; i < champInRole.length; i++) {
        let currChamp = {}
        for (const [key, value] of Object.entries(avec)) {
            if (value.Avec == champInRole[i])
                currChamp = value
        }

        for (const [key, value] of Object.entries(currChamp)) {
            for (let j = 0; j < allies.length; j++) {
                if (key == allies[j]) {
                    if (typeof(value) == "number")
                        stats[i].push(value)
                    if (typeof(value) == "string")
                        stats[i].push(parseFloat(value.replace(",",".")))
                }
            }
        }

        currChamp = {}
        for (const [key, value] of Object.entries(contre)) {
            if (value.Contre == champInRole[i])
                currChamp = value
        }

        for (const [key, value] of Object.entries(currChamp)) {
            for (let j = 0; j < ennemies.length; j++) {
                if (key == ennemies[j]) {
                    if (typeof(value) == "number")
                        stats[i].push(value)
                    if (typeof(value) == "string")
                        stats[i].push(parseFloat(value.replace(",",".")))
                }
            }
        }
    }


    let finale = []
    for (let i = 0; i < champInRole.length; i++) {
        const sum = stats[i].reduce((acc, val) => acc + val, 0);
        const avg = sum / stats[i].length;
        finale.push({name: champInRole[i], average: avg})
    }
    finale.sort(function(a, b) {return b.average - a.average})


    
    let favChamp = [];
    favChamp.push(document.querySelector('#fav1').value);
    favChamp.push(document.querySelector('#fav2').value);
    favChamp.push(document.querySelector('#fav3').value);

    document.querySelector('.res').innerHTML = "";
    document.querySelector('.best-champ-res').innerHTML = "";




    countChampFavorisIn = 0

    // Parcourir la liste finale et afficher uniquement les champions favoris
    for (let i = 0; i < finale.length; i++) {
        if (favChamp.includes(finale[i].name) && !isNaN(finale[i].average)) {
            let div = document.createElement('div');
            let img = document.createElement('img');

            div.style.display = "flex";
            div.style.alignItems = "center";
            div.style.justifyContent = "center";

            img.src = `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${finale[i].name}.png`;
            img.style.width = "10%";

            div.append(img);
            // Créer la barre de progression
            let progressBar = document.createElement('div');
            progressBar.style.width = "60%";
            progressBar.style.height = "30px";
            progressBar.style.backgroundColor = "gray";
            progressBar.style.position = "relative";
            progressBar.style.borderRadius = "5px";

            // Créer la partie dorée remplie de la barre de progression
            let filledBar = document.createElement('div');
            filledBar.style.width = `${finale[i].average.toFixed(2)}%`;
            filledBar.style.height = "100%";
            filledBar.style.backgroundColor = "gold";
            filledBar.style.borderRadius = "5px";

            // Ajouter le pourcentage à la barre de progression
            let percentageText = document.createElement('span');
            percentageText.innerHTML = `${finale[i].average.toFixed(2)}%`;
            percentageText.style.position = "absolute";
            percentageText.style.left = "50%";
            percentageText.style.top = "50%";
            percentageText.style.transform = "translate(-50%, -50%)";
            percentageText.style.fontWeight = "bold";

            progressBar.append(filledBar);
            progressBar.append(percentageText);
            div.append(progressBar);

            document.querySelector('.res').append(div);
            countChampFavorisIn = countChampFavorisIn + 1
            console.log(countChampFavorisIn)
        } else {
            
        }
        
    
    }
    // Trouver les champion avec le meilleur winrate
    for ( let y = 0; y < 4 - countChampFavorisIn;y++) {
        let bestChamp = finale[y];

        // Afficher le meilleur champion en dessous du message
        if (!isNaN(bestChamp.average)) {
            let div = document.createElement('div');
            let img = document.createElement('img');

            div.style.display = "flex";
            div.style.alignItems = "center";
            div.style.justifyContent = "center";

            img.src = `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${bestChamp.name}.png`;
            img.style.width = "10%";

            div.append(img);
            
                // Créer la barre de progression pour le meilleur champion
            let progressBar = document.createElement('div');
            progressBar.style.width = "60%";
            progressBar.style.height = "30px";
            progressBar.style.backgroundColor = "gray";
            progressBar.style.position = "relative";
            progressBar.style.borderRadius = "5px";

            // Créer la partie dorée remplie de la barre de progression
            let filledBar = document.createElement('div');
            filledBar.style.width = `${bestChamp.average.toFixed(2)}%`;
            filledBar.style.height = "100%";
            filledBar.style.backgroundColor = "gold";
            filledBar.style.borderRadius = "5px";

            // Ajouter le pourcentage à la barre de progression
            let percentageText = document.createElement('span');
            percentageText.innerHTML = `${bestChamp.average.toFixed(2)}%`;
            percentageText.style.position = "absolute";
            percentageText.style.left = "50%";
            percentageText.style.top = "50%";
            percentageText.style.transform = "translate(-50%, -50%)";
            percentageText.style.fontWeight = "bold";

            progressBar.append(filledBar);
            progressBar.append(percentageText);
            div.append(progressBar);

            document.querySelector('.res').append(div);
            document.querySelector('.best-champ-res').append(div);
        } else {
            console.log(bestChamp);
        }
    }
}

