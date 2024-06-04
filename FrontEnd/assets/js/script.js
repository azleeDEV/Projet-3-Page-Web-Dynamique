


// init des fonctions//

init()

function init(){
    
    getWorks();
    getCategories();
    loadAdminMode();
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

function loadAdminMode(){

    if(localStorage.token){
        displayBandeau()
        displayEdit()
    }

}

// afficher le bandeau du mode edit

function displayBandeau(){

    let bandeau = document.createElement("div")
    bandeau.setAttribute("id","adminBandeau")
    let img = document.createElement("img")
    img.setAttribute("src","assets/icons/pen.svg.svg");
    img.setAttribute("alt","logo edit");
    let span = document.createElement("span")
    span.innerText = "Mode édition"
    bandeau.append(img)
    bandeau.append(span)
    document.querySelector("body").prepend(bandeau)   
}

// afficher le boutton edit

function displayEdit(){

    let adminModif = document.createElement("div")
    adminModif.setAttribute("id","adminModif")
    let img = document.createElement("img")
    img.setAttribute("src","assets/icons/penBlack.svg");
    img.setAttribute("alt","logo edit");
    let span = document.createElement("span")
    span.innerHTML = "<a>modifier</a>";
    span.setAttribute("id","myBtn") 
    adminModif.append(img)
    adminModif.append(span)
    document.querySelector("#portfolio h2").prepend(adminModif)

}

// faire apparaitre les modal

const modal = document.getElementById('myModal');
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];


btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}