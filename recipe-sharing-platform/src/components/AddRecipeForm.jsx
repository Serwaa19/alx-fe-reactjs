import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const parseList = (text) =>
  text
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);

function AddRecipeForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const next = {};
    if (!title.trim()) next.title = 'Recipe title is required.';
    const ingredientList = parseList(ingredients);
    if (!ingredients.trim()) next.ingredients = 'Ingredients are required.';
    else if (ingredientList.length < 2) next.ingredients = 'Please enter at least two ingredients (one per line or comma-separated).';
    if (!steps.trim()) next.steps = 'Preparation steps are required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleBlur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ title: true, ingredients: true, steps: true });
    if (!validate()) return;

    const ingredientList = parseList(ingredients);
    const stepList = steps
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean);

    // Client-side only: log and redirect (no backend to POST to)
    const recipe = { title: title.trim(), ingredients: ingredientList, instructions: stepList };
    console.log('New recipe:', recipe);
    navigate('/', { state: { message: 'Recipe submitted successfully!' } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8 transition-colors"
        >
          ← Back to recipes
        </Link>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-gray-200">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Add a new recipe
            </h1>
            <p className="mt-1 text-gray-600">
              Share your recipe with the community.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Recipe title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleBlur('title')}
                placeholder="e.g. Spaghetti Carbonara"
                className={`mt-1 block w-full rounded-lg border px-4 py-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? 'title-error' : undefined}
              />
              {errors.title && (
                <p id="title-error" className="mt-1.5 text-sm text-red-600" role="alert">
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="ingredients"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ingredients
              </label>
              <textarea
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                onBlur={handleBlur('ingredients')}
                placeholder="One ingredient per line, or comma-separated. At least two required."
                rows={5}
                className={`mt-1 block w-full rounded-lg border px-4 py-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm resize-y min-h-[120px] ${
                  errors.ingredients ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!errors.ingredients}
                aria-describedby={errors.ingredients ? 'ingredients-error' : undefined}
              />
              {errors.ingredients && (
                <p id="ingredients-error" className="mt-1.5 text-sm text-red-600" role="alert">
                  {errors.ingredients}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="steps"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Preparation steps
              </label>
              <textarea
                id="steps"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                onBlur={handleBlur('steps')}
                placeholder="Enter each step on a new line."
                rows={6}
                className={`mt-1 block w-full rounded-lg border px-4 py-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm resize-y min-h-[140px] ${
                  errors.steps ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!errors.steps}
                aria-describedby={errors.steps ? 'steps-error' : undefined}
              />
              {errors.steps && (
                <p id="steps-error" className="mt-1.5 text-sm text-red-600" role="alert">
                  {errors.steps}
                </p>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
              <Link
                to="/"
                className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="inline-flex justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Submit recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRecipeForm;
