let galleryHtml = document.querySelector(".gallery")
let galleryModalHtml = document.querySelector(".gallery-modal")
let filtresHtml = document.querySelector(".Filtres")
let modeEditionHtml = document.querySelector(".bouton-modifier")
let loginHtml = document.querySelector(".login")
let logoutHtml = document.querySelector(".logout")
let BtnmodalAdd = document.querySelector(".input-modal")
let BtnModifierModal = document.querySelector(".btn-modifier-modal")
let IconeModifierModal = document.querySelector(".icone-modifier")
let closeModalHtml = document.querySelector(".modal_close")
let closeModalAjoutHtml = document.querySelector(".modal_close_ajout")
let Arrowhtml = document.querySelector(".fa-arrow-left")
const formNeWork = document.getElementById("formulaire-ajout");
const tokenExist = isTokenExist();
let allWorks = []
document.querySelector(".validation-photo").style.disabled = true;
function isConnected(){
    if(tokenExist){
        console.log(modeEditionHtml)
        modeEditionHtml.style.display = "flex"
        filtresHtml.style.display = "none"
        loginHtml.style.display = "none"
        logoutHtml.style.display = "flex"
        IconeModifierModal.style.display = "flex"
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
        IconeModifierModal.style.display = "none"
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
        <figure class="img-gallery">
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



function showCategories(arrayOfCategories) {
    let categoriesHtml = `<button class="boutons-filtres active" data-category-id="all">Tous</button>`;
    
    arrayOfCategories.forEach(cat => {
        categoriesHtml += `<button class="boutons-filtres" data-category-id="${cat.id}">${cat.name}</button>`;
    });

    filtresHtml.innerHTML = categoriesHtml;
    let boutonsFiltresHtml = document.querySelectorAll(".boutons-filtres");

    boutonsFiltresHtml.forEach((btn, index) => {
        btn.addEventListener("click", function (e) {
            // Retirez la classe active de tous les boutons
            boutonsFiltresHtml.forEach(btn => {
                btn.classList.remove("active");
            });

            btn.classList.add("active");

            let categoryId = btn.getAttribute("data-category-id");

            if (categoryId === "all") {
                getAllWorks().then((works) => {
                    shoWorks(works);
                });
            } else {
                let filtersWorks = allWorks.filter(wk => wk.categoryId == categoryId);
                shoWorks(filtersWorks);
            }
        });
    });
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

selectName.addEventListener("change",function(){
    if (selectName.value.trim() != "" && categorieSelect.value != "") {
        document.querySelector(".validation-photo").style.disabled = false;
        document.querySelector(".validation-photo").classList.remove("btn-grey");
        document.querySelector(".validation-photo").classList.add("btn-green");
    } else{
        document.querySelector(".validation-photo").style.disabled = true;
        document.querySelector(".validation-photo").classList.add("btn-grey");
        document.querySelector(".validation-photo").classList.remove("btn-green");
    }
})

         
async function addWork(FormData) {
    let bearer = "Bearer " + userToken;
    let httpOptions = "";

    if (userToken !== null) {
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
    document.querySelector(".modal-container-ajout").style.display="flex"
})
IconeModifierModal.addEventListener("click",function(){
    document.querySelector(".modal").style.display="flex"
})
closeModalHtml.addEventListener("click",function(){
    document.querySelector(".modal").style.display="none"
    
})
closeModalAjoutHtml.addEventListener("click",function(){
    document.querySelector(".modal-container-ajout").style.display="none"
    
})
Arrowhtml.addEventListener("click",function(){
    document.querySelector(".modal").style.display="flex"
    document.querySelector(".modal-container-ajout").style.display="none"
})
async function addWork(FormData) {
    console.log(FormData)
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
            method: "POST",
            headers: headers,
            body: FormData
        };
    }
    
        const response = await fetch("http://localhost:5678/api/works", httpOptions);
        console.log(response.status);
        return response;
       }


        const ajouterPhotoBtn = document.getElementById("ajouterPhotoBtn");
        const inputPhoto = document.getElementById("inputPhoto");

ajouterPhotoBtn.addEventListener("click", async function () {
    inputPhoto.click();
});

inputPhoto.addEventListener("change", async function (event) {

    let selectedFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);

    if (selectedFile) {
        document.querySelector(".validation-photo").style.disabled = false;
        const ajoutPhotoBefore = document.querySelector(".ajout-photo-before");
        ajoutPhotoBefore.style.display = "none";
        const ajoutPhotoAfter = document.querySelector(".ajout-photo-after");
        ajoutPhotoAfter.style.display = "flex";
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.classList.add("uploaded-image");
        ajoutPhotoAfter.appendChild(imageElement);

        let categoryId = 0;

    
        categorieSelect.addEventListener("change", async function () {
            const selectedCategoryId = parseInt(categorieSelect.value);

            if (!isNaN(selectedCategoryId)) {
                categoryId = selectedCategoryId;
            } else {
                categoryId = ""; 
            }
            if (selectName.value.trim() != "" && categorieSelect.value != "") {
                document.querySelector(".validation-photo").style.disabled = false;
                document.querySelector(".validation-photo").classList.remove("btn-grey");
                document.querySelector(".validation-photo").classList.add("btn-green");
            }else{
                document.querySelector(".validation-photo").style.disabled = true;
                document.querySelector(".validation-photo").classList.add("btn-grey");
                document.querySelector(".validation-photo").classList.remove("btn-green");
            }
        });

        formNeWork.addEventListener("submit", async function (e) {
            e.preventDefault();

            
                let imageName = selectedFile.name;
                const newimageUrl = `http://localhost:5678/images/${imageName}`;
              
                let formData = new FormData(formNeWork);

                formData.append("image", newimageUrl);
                formData.append("title", selectName.value);
                formData.append("category", parseInt(categorieSelect.value));

                addWork(formData).then((res) => {
                    alert("Image correctement ajoutée")
                    if (res.status == 201) {
                        getAllWorks().then((works) => {
                            shoWorks(works)
                        });
                   
                    }
                })
            
            document.querySelector(".modal").style.display="flex"
            document.querySelector(".modal-container-ajout").style.display="none"
            const ajoutPhotoBefore = document.querySelector(".ajout-photo-before");
            ajoutPhotoBefore.style.display = "flex";
            const ajoutPhotoAfter = document.querySelector(".ajout-photo-after");
            ajoutPhotoAfter.style.display = "none";
            formNeWork.reset();
        })
    }
});