import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const recipes = useRecipeStore((state) => state.recipes);

  // Use filteredRecipes if search is active, else full recipes
  const displayRecipes =
    filteredRecipes.length > 0 || useRecipeStore.getState().searchTerm
      ? filteredRecipes
      : recipes;

  if (displayRecipes.length === 0) return <p>No recipes found.</p>;

  return (
    <div>
      {displayRecipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
