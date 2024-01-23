let galleryHtml = document.querySelector(".gallery")
let galleryModalHtml = document.querySelector(".gallery-modal")
let filtresHtml = document.querySelector(".Filtres")
let modeEditionHtml = document.querySelector(".bouton-modifier")
let loginHtml = document.querySelector(".login")
let logoutHtml = document.querySelector(".logout")
let BtnmodalAdd = document.querySelector(".btn-showmodal-nework")
let BtnModifierModal = document.querySelector(".btn-modifier-modal")
const tokenExist = isTokenExist();
let allWorks = []

function isConnected(){
    if(tokenExist){
        console.log(modeEditionHtml)
        modeEditionHtml.style.display = "flex"
        filtresHtml.style.display = "none"
        loginHtml.style.display = "none"
        logoutHtml.style.display = "flex"
        BtnModifierModal.style.display = "block"
    }
}
function isDeconnected(){
    if(tokenExist){
        deleteToken()
        console.log(modeEditionHtml)
        modeEditionHtml.style.display = "none"
        filtresHtml.style.display = "flex"
        loginHtml.style.display = "flex"
        logoutHtml.style.display = "none"
        BtnModifierModal.style.display = "none"
    }
}
logoutHtml.addEventListener("click", isDeconnected)
isConnected()
async function getAllWorks(){
    const response = await fetch("http://localhost:5678/api/works")
    let works = response.json()
    return works;
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
    allWorks = [...works]
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
    boutonsFiltresHtml.forEach((btn,index)=>{
        btn.addEventListener("click",function(e){
            let filtersWorks = allWorks.filter(wk=>wk.categoryId == index)
            shoWorks(filtersWorks)
            console.log(filtersWorks)
        })
    })

}

function deleteWorkbyId(workid){
    let userToken = window.localStorage.getItem("loginToken");
    let bearer = "Bearer " + userToken;
    let httpOptions = "";

    if (userToken !== null) {
        const headersContent = {
            "Accept": "*/*",
            "Authorization": bearer,
        };
        const headers = new Headers(headersContent);
        httpOptions = {
            method: "DELETE",
            headers: headers
        };
    }
    fetch('http://localhost:5678/api/works/'+workid, httpOptions)
    .then(() =>{
        alert('The work is deleted')
        getAllWorks().then((works)=>{
            shoWorks(works)
        })
    });
}

function isTokenExist(){
    const token = localStorage.getItem('loginToken')
    console.log(token)
    if (token){
        return true;
    }else{
        return false;
    }
}
function deleteToken(){
    const token = localStorage.getItem('loginToken')
    console.log(token)
    if (token){
        localStorage.removeItem('loginToken')
    }
}



         
async function addWork(FormData) {
    let storedToken = window.localStorage.getItem("appToken");
    let bearer = "Bearer " + storedToken;
    let httpOptions = "";

    if (storedToken !== null) {
        const headersContent = {
            "Accept": "*/*",
            "Authorization": bearer,
        };
        const headers = new Headers(headersContent);
        httpOptions = {
            method: "POST",
            headers: headers,
            body: FormData
        };
    }
    
const response = await fetch("http://localhost:5678/api/works", httpOptions);
        console.log(response.status);
        return response;
       }

BtnmodalAdd.addEventListener("click",function(){
    document.querySelector(".modal").style.display="none"
    document.querySelector(".modal2").style.display="flex"
})
BtnModifierModal.addEventListener("click",function(){
    document.querySelector(".modal").style.display="flex"
    console.log("hello")
})
