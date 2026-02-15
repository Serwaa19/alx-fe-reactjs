import { useState, useEffect } from 'react';
import recipeData from '../data.json';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRecipes(recipeData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Loading recipes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Recipe Sharing Platform
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Discover and share delicious recipes
        </p>
      </header>

      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <article
              key={recipe.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                  {recipe.summary}
                </p>
                <a
                  href={`/recipe/${recipe.id}`}
                  className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  View Recipe →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
