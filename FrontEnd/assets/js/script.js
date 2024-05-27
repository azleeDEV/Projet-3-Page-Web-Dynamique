


// init des fonctions//

init()

function init(){
    
    getWorks();
    getCategories();
}


// récuperation des categories et création des buttons//

function getCategories(){

    fetch("http://localhost:5678/api/categories")
    .then(result=>result.json())
    .then(categories=>displayCategories(categories))
}

function displayCategories(categories){
    for (let category of categories){

        let buttonCat = document.createElement("button");
        buttonCat.innerText = category.name;
        buttonCat.classList.add("btn");
        buttonCat.dataset.categoryId = category.id;
        document.querySelector(".filters").append(buttonCat);

    }

    const buttons = document.querySelectorAll(".filters .btn");
    buttons.forEach(button => button.addEventListener("click", filterWorks));
}


// afficher les Images//

function getWorks(){

    fetch("http://localhost:5678/api/works")
    .then(result=>result.json())
    .then(works=>displayWorks(works))
}

function displayWorks(works){

    for(let work of works ){

        let figure = document.createElement("figure");
        figure.dataset.categoryId = work.categoryId
        let img = document.createElement("img");
        img.setAttribute("src",work.imageUrl);
        img.setAttribute("alt",work.title);
        let figCaption = document.createElement("figcaption");
        figCaption.innerText = work.title;

        figure.append(img);
        figure.append(figCaption);
        
        console.log(figure);
        
        document.querySelector(".gallery").append(figure);
        
    }
}

// mise en marche des button//

function filterWorks(event) {
    const selectedCategoryId = event.target.dataset.categoryId;
    const figures = document.querySelectorAll(".gallery figure");
    
    document.querySelectorAll(".filters .btn").forEach(btn =>{
        btn.classList.remove("active","active-transition");
    })

    event.target.classList.add("active","active-transition");

    figures.forEach(figure => {
        if (selectedCategoryId === "" || figure.dataset.categoryId === selectedCategoryId) {
            // figure.style.display = "";
            figure.classList.remove("display-transition");
        } else {
            // figure.style.display = "none";
            figure.classList.add("display-transition"); 
        }
    });
}
