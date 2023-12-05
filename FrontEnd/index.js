let galleryHtml = document.querySelector(".gallery")
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
    arrayOfWorks.forEach(work => {
        worksHtml += `
        <figure>
				<img src="${work.imageUrl}" alt="${work.title}">
				<figcaption>${work.title}</figcaption>
			</figure>
        `
    });
    galleryHtml.innerHTML = worksHtml
    
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

