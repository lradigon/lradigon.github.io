function generateImageUrl(championName) {
    const baseUrl = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash";
    const formattedName = championName.replace(/ /g, "_");
    return `${baseUrl}/${formattedName}_0.jpg`;
}

// Fonction du calcul des stats pour les alliés et les ennemis sélectionnés 
function doAllStats() {
    if (typeof currRole === "undefined")
        return;

    const role = currRole
    // List des personnages déjà pick
    const alliesChampsPick = champs.filter(champ => champ.name !== '' && champ.id.charAt(0) === 'a').map(champ => champ.name)
    const ennemiesChampsPick = champs.filter(champ => champ.name !== '' && champ.id.charAt(0) === 'e').map(champ => champ.name)
    // List des personnages disponibles pour le role
    const champsInRole = (champ.filter(item => item.role === role)).map(item => item.name)
    // List des stats avec et contre
    const statsList = champsInRole.reduce((acc, champInRole, i) => {
        const allyChamps = Object.values(avec).find((item) => item.Avec === champInRole) || {};
        const ennemyChamps = Object.values(contre).find((item) => item.Contre === champInRole) || {};

        Object.entries(allyChamps).forEach(([key, value]) => {
            if (alliesChampsPick.includes(key)) {
                typeof value === "number"
                ? acc[i].push(value)
                : typeof value === "string" &&
                    acc[i].push(parseFloat(value.replace(",", ".")))
            }
        })

        Object.entries(ennemyChamps).forEach(([key, value]) => {
            if (ennemiesChampsPick.includes(key)) {
                typeof value === "number"
                ? acc[i].push(value)
                : typeof value === "string" &&
                    acc[i].push(parseFloat(value.replace(",", ".")))
            }
        })
        return acc
    }, Array(champsInRole.length).fill().map(() => []))


    // Calcul les chances de gagner de chaque personnages dans la list
    let statsToShow = []
    for (let i = 0; i < champsInRole.length; i++) {
        const sum = statsList[i].reduce((acc, val) => acc + val, 0);
        const avg = sum / statsList[i].length;
        statsToShow.push({name: champsInRole[i], average: avg})
    }
    statsToShow.sort(function(a, b) {return b.average - a.average})


    // Get les champions favoris
    let favChamp = [];
    favChamp.push(document.querySelector('#fav1').value);
    favChamp.push(document.querySelector('#fav2').value);
    favChamp.push(document.querySelector('#fav3').value);


    // Reset le html du résultat
    document.querySelector('.res').innerHTML = "";
    document.querySelector('.best-champ-res').innerHTML = "";


    let countChampFavorisIn = 0

    // Parcourir la liste statsToShow et afficher uniquement les champions favoris
    for (let i = 0; i < statsToShow.length; i++) {
        if (favChamp.includes(statsToShow[i].name) && !isNaN(statsToShow[i].average)) {
            let div = document.createElement('div');
            let img = champsIcones.find(icone => icone.name == statsToShow[i].name).img

            div.className = "progress-bar-container"
            img.style.width = "10%"

            div.append(img)
            div.append(createProgressbar(`${statsToShow[i].average.toFixed(2)}%`))

            document.querySelector('.res').append(div);
            countChampFavorisIn = countChampFavorisIn + 1
        }
    }
    // Trouver les champion avec le meilleur winrate
    for (let y = 0; y < 4 - countChampFavorisIn;y++) {
        // Afficher le meilleur champion en dessous du message
        if (!isNaN(statsToShow[y].average)) {
            let div = document.createElement('div');
            let img = champsIcones.find(icone => icone.name == statsToShow[y].name).img

            div.className = "progress-bar-container"
            img.style.width = "10%";

            div.append(img);
            div.append(createProgressbar(`${statsToShow[y].average.toFixed(2)}%`));

            document.querySelector('.res').append(div);
            document.querySelector('.best-champ-res').append(div);
        }
    }

    function createProgressbar(width) {
        let progressBar = document.createElement('div')
        progressBar.className = "progress-bar"

        // Créer la partie dorée remplie de la barre de progression
        let filledBar = document.createElement('div')
        filledBar.style.width = width;
        filledBar.className = "progress-bar-fill"

        // Ajouter le pourcentage à la barre de progression
        let percentageText = document.createElement('span')
        percentageText.innerHTML = width
        percentageText.className = "progress-bar-percent"

        progressBar.append(filledBar)
        progressBar.append(percentageText)

        return progressBar
    }



    // FRISE

    /*
    const championsContainer = document.querySelector('.champions');

    statsToShow.forEach(champion => {
        const championDiv = document.createElement('div');
        championDiv.className = 'champion';

        const img = document.createElement('img');
        img.src = generateImageUrl(champion.name);
        img.alt = champion.name;

        championDiv.appendChild(img);

        championsContainer.appendChild(championDiv);

        championDiv.style.left = `calc(${champion.winrate}% * (100% - 50px) - 20px)`;
    });
    // Créez une échelle de 0 à 100 en bas de la frise
    const scaleContainer = document.createElement('div');
    scaleContainer.className = 'scale';

    for (let i = 0; i <= 100; i += 10) {
        const scaleMark = document.createElement('span');
        scaleMark.textContent = i;
        scaleContainer.appendChild(scaleMark);
    }
    document.querySelector('.frise').appendChild(scaleContainer);
    */
}

