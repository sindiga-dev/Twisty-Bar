const searchButton=document.getElementById('search-button');
const cocktailList=document.getElementById('cocktail');
const cocktailDetails=document.getElementById('cocktail-details-content');
const recipeCloseBtn=document.getElementById('recipe-close-btn');

//adding event listeners
searchButton.addEventListener('click',getCocktailList);
cocktailList.addEventListener('click',getCocktailRecipe);
recipeCloseBtn.addEventListener('click',()=>{
    cocktailDetails.parentElement.classList.remove('showRecipe');
    } );