function FirstApplication(){
    // Supprimer ou masquer les éléments souhaités
    const roleContainer = document.getElementById("role-container")
    const blurBackground = document.getElementById("blur-background")

    if (roleContainer) {
        roleContainer.style.display = "none"; // Masquer l'élément
        // roleContainer.remove(); // Supprimer l'élément (alternative)
    }

    if (blurBackground) {
        blurBackground.style.display = "none"; // Masquer l'élément
        // blurBackground.remove(); // Supprimer l'élément (alternative)
    }
    

    const favChamp = [];
    favChamp.push(document.querySelector('#favFirst1').value);
    favChamp.push(document.querySelector('#favFirst2').value);
    favChamp.push(document.querySelector('#favFirst3').value);
    
    fav1.value = favChamp[0];
    fav2.value = favChamp[1];
    fav3.value = favChamp[2];

    
    const championName = favChamp[0];
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

    doAllStats();
}