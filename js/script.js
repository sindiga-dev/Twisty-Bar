const searchButton=document.getElementById('search-btn');
const cocktailList=document.getElementById('cocktail');
const cocktailDetails=document.getElementById('cocktail-details-content');
const recipeCloseBtn=document.getElementById('recipe-close-btn');

//adding event listeners
searchButton.addEventListener('click',getCocktailList);
cocktailList.addEventListener('click',getCocktailRecipe);
recipeCloseBtn.addEventListener('click',()=>{
    cocktailDetails.parentElement.classList.remove('showRecipe');
    } );

//get cocktail that matches ingredients

function getCocktailList(){
    let searchInputText=document.getElementById('search-input').value.trim();
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka${searchInputText}`)
    .then(response=>response.json())
    .then(data=>{
        let html='';
        if(data.cocktail){
            data.cocktail.forEach(cocktail=>{
                html+=`
                    <div class = "cocktail-item" data-id = "${cocktail.idCocktail}">
                        <div class = "cocktail-img">
                            <img src = "${cocktail.strCocktailThumb}" alt = "food">
                        </div>
                        <div class = "cocktail-name">
                            <h3>${cocktail.strCocktail}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
             `;
            
            });
        cocktailList.classList.remove('notFound');
    }else{
        html="sorry, we didn't find any cocktails!";
        cocktailList.classList.add('notFound');
    }
        cocktailList.innerHTML=html;
});
}

//get cocktail recipe
function getCocktailRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let cocktailItem=e.target.parentElement.parentElement;
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka'+cocktailItem.dataset.id)
        .then(response=>response.json())
        .then(data=>getCocktailRecipeModal(data.cocktail));
    }
}

//create modal
function cocktailRecipeModal(cocktail){
    console.log(cocktail)
    cocktail=cocktail[0];
    let html=`
        <h2 class = "recipe-title">${cocktail.strCocktail}</h2>
        <p class = "recipe-category">${cocktail.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${cocktail.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${cocktail.strCocktailThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${cocktail.strYoutube}" target = "_blank">Watch Video</a>
        </div>
`;
    cocktailDetails.innerHTML=html;
    cocktailDetails.parentElement.classList.add('showRecipe');
}