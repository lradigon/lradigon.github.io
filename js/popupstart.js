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
  console.log("Toutes les images sont chargées");

  // Réglage des dimensions du canvas
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;

    // Calcul de la largeur à couper pour chaque image
    let cropWidth1 = image1.width / 3;
    let cropWidth2 = image2.width / 3;
    let cropWidth3 = image3.width / 3;

    // Dessin des images coupées
    ctx.drawImage(image1, cropWidth1, 0, cropWidth1, image1.height, 0, 0, originalImage.width / 3, originalImage.height);
    ctx.drawImage(image2, cropWidth2, 0, cropWidth2, image2.height, originalImage.width / 3, 0, originalImage.width / 3, originalImage.height);
    ctx.drawImage(image3, cropWidth3, 0, cropWidth3, image3.height, (originalImage.width / 3) * 2, 0, originalImage.width / 3, originalImage.height);

  // Remplacement de l'image originale par le résultat du canvas
  let finalImageUrl = canvas.toDataURL();
  let originalImageElement = document.getElementById("a5-img");
  originalImageElement.src = finalImageUrl;
};

  
/*  // Callback lorsque toutes les images sont chargées
let onAllImagesLoaded = () => {
  console.log("Toutes les images sont chargées");

  // Réglage des dimensions du canvas et du fond noir
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Définition des coordonnées et du rayon des cercles
  let radius = originalImage.width / 6;
  let yOffset = originalImage.height / 3; // Ajustement de l'espacement vertical
  let xOffset = 10; // Ajustement de l'espacement horizontal
  let circle1 = { x: canvas.width / 2 - radius - xOffset, y: yOffset + radius };
  let circle2 = { x: canvas.width / 2 + radius + xOffset, y: yOffset + radius };
  let circle3 = { x: canvas.width / 2, y: yOffset + 3 * radius };


  // Fonction pour dessiner un cercle et découper l'image
  let drawImageInCircle = (image, circle) => {
    ctx.save(); // Sauvegarde le contexte actuel
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(image, circle.x - radius, circle.y - radius, 2 * radius, 2 * radius);
    ctx.restore(); // Restaure le contexte précédemment sauvegardé
  };

  // Dessin des images dans les cercles
  drawImageInCircle(image1, circle1);
  drawImageInCircle(image2, circle2);
  drawImageInCircle(image3, circle3);

  // Remplacement de l'image originale par le résultat du canvas
  let finalImageUrl = canvas.toDataURL();
  let originalImageElement = document.getElementById("a5-img");
  originalImageElement.src = finalImageUrl;
}; */

  // Fonction pour gérer le chargement des images
  let onImageLoad = () => {
    imagesLoaded++;
    console.log("Image chargée:", imagesLoaded);
    if (imagesLoaded === 4) {
      onAllImagesLoaded();
    }
  };

// Configuration et chargement des images
originalImage.crossOrigin = "anonymous";
originalImage.src = originalImageUrl;
originalImage.onload = onImageLoad;

image1.crossOrigin = "anonymous";
image1.src = imageUrlv1;
image1.onload = onImageLoad;

image2.crossOrigin = "anonymous";
image2.src = imageUrlv2;
image2.onload = onImageLoad;

image3.crossOrigin = "anonymous";
image3.src = imageUrlv3;
image3.onload = onImageLoad;



    doAllStats();
}