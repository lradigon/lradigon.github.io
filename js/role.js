function selectRole(role, element) {
    // Désélectionner toutes les images
    const images = document.getElementsByClassName("role-image");
    for (let i = 0; i < images.length; i++) {
        images[i].classList.remove("selected");
    }

    // Sélectionner l'image cliquée
    const selectedImage = element.children[0];
    selectedImage.classList.add("selected");

    currRole = role;

    // Appeler la fonction doAllStats pour mettre à jour les statistiques et l'affichage
    doAllStats();
}