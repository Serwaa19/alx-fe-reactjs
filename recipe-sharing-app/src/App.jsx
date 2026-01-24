import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

const App = () => {
  return (
    <Router>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
        <h1>Recipe Sharing App</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <AddRecipeForm />
                <FavoritesList />
                <RecommendationsList />
                <RecipeList />
              </>
            }
          />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
