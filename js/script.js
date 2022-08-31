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

//get cockatail that matches ingredients

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
                        <div class = "cockatail-name">
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
