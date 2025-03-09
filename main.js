let index = 1;

document.querySelector('.carousel-arrow-left').addEventListener('click', function() {
    const image = document.querySelector('.carousel-images img');
    index -= 1;
    if (index < 1)
        index = 4;
    image.src = `./assets/slide-${index}.jpg`    
});

document.querySelector('.carousel-arrow-right').addEventListener('click', function() {
    const image = document.querySelector('.carousel-images img');
    index += 1;
    if (index > 4)
        index = 1;
    image.src = `./assets/slide-${index}.jpg`    
});
