


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

    if(!localStorage.token){
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
    else{
        document.querySelector('.filters').style.display= "none"
    }
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
        LogOut()
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


    const btn = document.getElementById("myBtn");
    btn.addEventListener("click", function () {
        modal.style.display = "block";
        loadWorksInModal();
    });

}

// faire apparaitre les modal

const modal = document.getElementById('myModal');
const span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// afficher les figure dans la modal


function loadWorksInModal() {
    fetch("http://localhost:5678/api/works")
    .then(result => result.json())
    .then(works => {
        const modalImgContainer = document.querySelector(".modalImg");
        modalImgContainer.innerHTML = "";  

        for (let work of works) {

            let figure = document.createElement("figure");
            
            let img = document.createElement("img");
            img.setAttribute("src",work.imageUrl);
            img.setAttribute("alt",work.title);

            let deleteImg = document.createElement("img");
            deleteImg.setAttribute("src","assets/icons/trash-can-solid.svg");
            deleteImg.setAttribute("alt","logo edit");
            deleteImg.dataset.categoryId = work.categoryId
            deleteImg.dataset.workId = work.id
            deleteImg.addEventListener("click", deleteWork);

            figure.append(img);
            figure.append(deleteImg);
            console.log(figure);

            modalImgContainer.append(figure);

        }
    });
}

function deleteWork(event) {
    const workId = event.target.dataset.workId;
    console.log(workId);

    fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.token}`  // 
        }
    })
    .then(response => {
        if (response.ok) {
            modal.style.display = "none";
            document.querySelector(".gallery").innerHTML=""  
            getWorks() 
        } else {
            alert("Erreur lors de la suppression de la photo.");
        }
    })
    .catch(error => {
        console.error("Erreur:", error);
        alert("Erreur lors de la suppression de la photo.");
    });
}

// ouvrir la deuxieme modal


const modal2 = document.getElementById('myModal2');
const addFig = document.getElementById('addFig');
const x = document.querySelector('.fa-xmark');
const arrow = document.querySelector('.fa-arrow-left')

// faire fonctionner le X

x.onclick = function () {
    modal2.style.display = "none";
}

arrow.onclick = function () {
    modal2.style.display = "none";
    modal.style.display = "block";
}

// cliquer n'importe ou pour fermer la modal

// window.onclick = function (event) {
//     if (event.target == modal2) {
//         modal2.style.display = "none";
//     }
// }

// ouvrir la modal2 et ferme la modal1
    addFig.addEventListener("click", function () {
        modal2.style.display = "block";
        modal.style.display = "none";
        checkInputs()
    });

    // fonction pour modifier le lien login 
    function LogOut() {

        // on recupere le boutton avec son id
        let loginLogoutButton = document.getElementById('loginLogoutButton');

        // on modifie avec textContent
        loginLogoutButton.textContent = 'logout';
        loginLogoutButton.href = '#';

        // on lui applique une fonction au click qui remove le token du localStorage
        loginLogoutButton.addEventListener('click', function() {
            localStorage.removeItem('token');
            window.location.reload();
        });
    };

    const contenuPhoto = document.querySelector(".photo-file");
    const inputFile = document.getElementById("avatar");
    const labelFile = document.querySelector(".photoAjouter");
    const iconFile = document.querySelector(".fa-image");
    const pFile = document.querySelector(".photo-size");

    // Afficher l'image dans input file
  function afficherImage() {
    //  l'image qui se trouve sur mon pc
    const image = this.files[0];
    if (image.size < 4 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgUrl = reader.result;
        const img = document.createElement("img");
        img.src = imgUrl;
        contenuPhoto.appendChild(img);
      };
      reader.readAsDataURL(image);

      labelFile.style.opacity = "0";
      iconFile.style.opacity = "0";
      pFile.style.opacity = "0";
    } else {
      alert(
        "Le fichier sélectionné est trop volumineux.La taille maximale est de 4 Mo."
      );
    }
  }
    inputFile.addEventListener("change", afficherImage); //  Ecouter le changement sur inputFile

// mise en place pour envoyer les figure

        // on recupere tout les champs du formulaires
function checkInputs(){
    const photo = document.getElementById("avatar");
    const titre = document.getElementById("titre");
    const categorie = document.getElementById("categorie");
    const submitButton = document.getElementById("btn-valider");
    const form = document.querySelector("#myModal2 form");
    const errorMessage = document.querySelector(".erreur");   

    // je lui ajoute un ecouteur d'evenement et fait un if else pour verifier les cahmps et afficher le boutton vert 
    form.addEventListener("input", function () {
        if (titre.value !== "" && categorie.value !== "" && photo.files.length > 0) {
            submitButton.disabled = false;
            submitButton.classList.add("btnValid");
            submitButton.addEventListener("click",addProject)
            errorMessage.textContent = "";
        } else {
            submitButton.classList.remove("btnValid");
            submitButton.removeEventListener("click",addProject)
            submitButton.disabled = true;
            errorMessage.textContent = "Veuillez remplir tous les champs du formulaire.";
        }
    });
}

function addProject(event){
    event.preventDefault()
    console.log(event)
    console.log(titre)
    console.log(photo)
    console.log(categorie)
}