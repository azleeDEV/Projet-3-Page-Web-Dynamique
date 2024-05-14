
init()

function init(){
    
    getWorks();
    getCategories();
}


function getCategories(){

    fetch("http://localhost:5678/api/categories")
    .then(result=>result.json())
    .then(categories=>displayCategories(categories))
}

function displayCategories(categories){
    for (let category of categories){

        let buttonCat = document.createElement("button");
        buttonCat.innerText = category.name
        // buttonCat.setAttribute("data-category-id",category.id)
        buttonCat.dataset.categoryId = category.id
        document.querySelector(".filters").append(buttonCat)

    }
}

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

        figure.append(img)
        figure.append(figCaption)
        
        console.log(figure);
        
        document.querySelector(".gallery").append(figure)
        
    }
}
