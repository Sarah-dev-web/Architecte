let galleryHtml = document.querySelector(".gallery")
let galleryModalHtml = document.querySelector(".gallery-modal")
let filtresHtml = document.querySelector(".Filtres")

async function getAllWorks(){
    const response = await fetch("http://localhost:5678/api/works")
    let allWorks = response.json()
    return allWorks;
}
async function getCategories(){
    const response = await fetch("http://localhost:5678/api/categories")
    let allCategories = response.json()
    return allCategories;
}
getCategories().then((categories)=>{
    showCategories(categories)
})
getAllWorks().then((works)=>{
    shoWorks(works)
})

function shoWorks(arrayOfWorks){
    let worksHtml = ""
    let modalElementHtml = ""
    arrayOfWorks.forEach(work => {
        worksHtml += `
        <figure>
				<img src="${work.imageUrl}" alt="${work.title}">
				<figcaption>${work.title}</figcaption>
			</figure>
        `
        modalElementHtml += `
        <figure class="img-trash">
                <span onclick="deleteWorkbyId(${work.id})" class="trash"><i class="fa-solid fa-trash-can"></i></span>
			    <span><img src="${work.imageUrl}" alt="${work.title}"></span>
			</figure>
        `
        
    });
    galleryHtml.innerHTML = worksHtml
    galleryModalHtml.innerHTML = modalElementHtml
    
}

function showCategories(arrayOfCategories){
    let categoriesHtml = ""
    categoriesHtml = `
        <button class="boutons-filtres btn-actif">Tous</button>
        `
    arrayOfCategories.forEach(cat => {
        categoriesHtml += `
        <button class="boutons-filtres">${cat.name}</button>
        `
    });
    filtresHtml.innerHTML = categoriesHtml
    let boutonsFiltresHtml = document.querySelectorAll(".boutons-filtres")
    boutonsFiltresHtml.forEach((btn)=>{
        btn.addEventListener("click",function(e){
            console.log(e.target.textContent)
        })
    })

}

function deleteWorkbyId(workid){
    fetch('http://localhost:5678/api/works/'+workid, { method: 'DELETE' })
    .then(() =>{
        alert('The work is deleted')
        getAllWorks().then((works)=>{
            shoWorks(works)
        })
    });
}
