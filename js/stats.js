function resetStats() {
    document.querySelector('#best-champ-res-none').style.display = "block"
    document.querySelector('.best-champ-res').innerHTML = ""
    document.querySelector('.res').innerHTML = champPlaceholders

    const favs = [fav1, fav2, fav3]
    for (let i = 0; i < favs.length; i++) {
        if (favs[i].value !== "Default") {
            const championImage2 = document.querySelector(`.imgc${i + 2}`);
            championImage2.src = `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${favs[i].value}.png`;
            championImage2.alt = favs[i].value;
        }
    }
}

function computeStats(alliesChampsPick, ennemiesChampsPick, champsInRole) {
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
        if (isNaN(avg))
            continue;
        statsToShow.push({name: champsInRole[i], average: avg})
    }
    statsToShow.sort(function(a, b) {return b.average - a.average})

    return statsToShow
}

function computeStatsBlind(champsInRole) {
    // List des personnages disponibles pour le role
    const statsToShow = []
    for (let i = 0; i < contre.length; i++) {
        if (!champsInRole.includes(contre[i].Contre))
            continue;
        let acc = 0
        let itt = 0
        for (const key in contre[i]) {
            if (contre[i][key] !== "" && !isNaN(parseFloat(contre[i][key])))
                acc += parseFloat(contre[i][key])
            itt++
        }
        statsToShow.push({name: contre[i].Contre, average: acc / itt})
    }
    statsToShow.sort(function(a, b) {return b.average - a.average})
    return statsToShow
}

// Fonction du calcul des stats pour les alliés et les ennemis sélectionnés 
function doAllStats() {
    if (typeof currRole === "undefined")
        return;
    
    
    // Pour enlever ou remettre les persos quand ya personne de pick
    let nbChampPick = 10
    for (let i = 0; i < champs.length; i++)
        if (champs[i].name === '')
            nbChampPick--


    document.querySelector('#best-champ-res-none').style.display = "none"


    const alliesChampsPick = champs.filter(champ => champ.name !== '' && champ.id.charAt(0) === 'a').map(champ => champ.name)
    const ennemiesChampsPick = champs.filter(champ => champ.name !== '' && champ.id.charAt(0) === 'e').map(champ => champ.name)
    const champsInRole = (champ.filter(item => item.role === currRole)).map(item => item.name)
    let statsToShow = []
    if (nbChampPick !== 0)
        statsToShow = computeStats(alliesChampsPick, ennemiesChampsPick, champsInRole)
    else
        statsToShow = computeStatsBlind(champsInRole)

    console.log(statsToShow)

    // Get les champions favoris
    let favChamp = [];
    favChamp.push(document.querySelector('#fav1').value);
    favChamp.push(document.querySelector('#fav2').value);
    favChamp.push(document.querySelector('#fav3').value);


    // Reset le html du résultat
    document.querySelector('.res').innerHTML = "";
    document.querySelector('.best-champ-res').innerHTML = "";


    if (statsToShow.length === 0)
        return;

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









    // Trouve la moyenne du nombre de game
    function findMeanNbGames(champName, alliesChampsPick, ennemiesChampsPick, champsInRole) {
        let acc = 0;
        console.log(alliesChampsPick)
        console.log(champsInRole)
        if (alliesChampsPick.length == 0 && ennemiesChampsPick.length == 0) {
            let i = 0
            for (; i < champsInRole.length; i++) {
                if (nbGames[champName][champsInRole[i]] != "")
                    acc += nbGames[champName][champsInRole[i]]
            }
            return acc / i
        } else {
            for (let i = 0; i < alliesChampsPick.length; i++)
                acc += nbGames[champName][alliesChampsPick[i]]
            for (let i = 0; i < ennemiesChampsPick.length; i++)
                acc += nbGames[champName][ennemiesChampsPick[i]]
            return acc / (alliesChampsPick.length + ennemiesChampsPick.length)
        }
    }

    // Réinistialise le nuage de point à 0
    const scatterplot = document.querySelector('#scatterplot')
    scatterplot.innerHTML = ""

    // Créé les données à mettre dans le nuage de points
    const data = []
    for (let i = 0; i < statsToShow.length; i++) {
        const newImage = new Image()
        newImage.src = champsIcones.find(icone => icone.name == statsToShow[i].name).img.src
        data.push({winrate: statsToShow[i].average, pickrate: findMeanNbGames(statsToShow[i].name, alliesChampsPick, ennemiesChampsPick, champsInRole), name: newImage.src, realName: statsToShow[i].name})
    }



    ///
    /// Création du graphique
    ///

    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 30, bottom: 30, left: 60}
    const height = 500 - margin.top - margin.bottom

    // append the svg object to the body of the page
    const svg = d3.select("#scatterplot")
                  .append("svg")
                  .attr("width", "100%")
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", `translate(${margin.left}, ${margin.top})`);

    
    // Add X axis label
    svg.append("text")
       .attr("text-anchor", "middle")
       .attr("x", scatterplot.getBoundingClientRect().width / 2)
       .attr("y", height + margin.top + 25)
       .text("Winrate");

    // Add Y axis label
    svg.append("text")
       .attr("text-anchor", "middle")
       .attr("transform", "rotate(-90)")
       .attr("x", -height / 2)
       .attr("y", -margin.left + 20)
       .text("Nombre de games");


    // Add X axis
    const x = d3.scaleLinear()
                .domain([0, 100])
                .range([ 0,  scatterplot.getBoundingClientRect().width]);

    svg.append("g")
       .attr("transform", `translate(0, ${height})`)
       .call(d3.axisBottom(x));


    // Add Y axis
    const y = d3.scaleLinear()
                .domain([data.reduce((min, obj) => obj.pickrate < min ? obj.pickrate : min, data[0].pickrate), data.reduce((max, obj) => obj.pickrate > max ? obj.pickrate : max, data[0].pickrate)])
                .range([ height, 0]);

    svg.append("g")
       .call(d3.axisLeft(y));

    // Add dots
    const dotGroup = svg.append('g')
                        .selectAll("image")
                        .data(data)
                        .join("image")
                        .attr("x", function (d) { return x(d.winrate) - 6; } )
                        .attr("y", function (d) { return y(d.pickrate) - 6; } )
                        .attr("width", 30)
                        .attr("height", 30)
                        .attr("xlink:href", function(d) { return d.name; })
                        .attr("class", "imageScatterplot");


    
    const imagesScatterplot = document.querySelectorAll('.imageScatterplot')
    for (let i = 0; i < imagesScatterplot.length; i++) {
        const scatterplotHover = document.querySelector('#scatterplotHover')
        imagesScatterplot[i].addEventListener('mouseover', function(event) {
            let p = document.createElement('p')
            p.id = `tooltip-text`
            p.className = `tooltip-text-${i}`
            p.innerHTML = `Champion: ${data[i].realName}<br>Games: ${data[i].pickrate}<br>Winrate: ${data[i].winrate.toFixed(3)}%`

            const rect = imagesScatterplot[i].getBoundingClientRect()

            const scrollX = window.scrollX || window.pageXOffset;
            const scrollY = window.scrollY || window.pageYOffset;

            scatterplotHover.appendChild(p)

            const pRect = p.getBoundingClientRect()

            p.style.top = `${(rect.top - rect.height - pRect.height) + scrollY}px`
            p.style.left = `${(rect.left - (pRect.width / 2) + (rect.width / 2)) + scrollX}px`
        })

        imagesScatterplot[i].addEventListener('mouseleave', () => {
            //console.log(document.querySelector(`.tooltip-text-${i}`))
            document.querySelector(`.tooltip-text-${i}`).remove()
        })
    }
}

