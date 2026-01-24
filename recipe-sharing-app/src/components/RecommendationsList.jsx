import { useRecipeStore } from './recipeStore';
import { useEffect } from 'react';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);

  useEffect(() => {
    generateRecommendations();
  }, []);

  if (recommendations.length === 0) return <p>No recommendations yet.</p>;

  return (
    <div>
      <h2>Recommended Recipes</h2>
      {recommendations.map((recipe) => (
        <div key={recipe.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;
