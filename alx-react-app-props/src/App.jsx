import React from 'react';
import ProfilePage from './ProfilePage';
import UserContext from './UserContext';
import Header from '../../alx-react-app-props/src/components/Header';
import MainContent from '../../alx-react-app-props/src/components/MainContent';
import Footer from '../../alx-react-app-props/src/components/Footer';
import Counter from '../../alx-react-app-props/src/components/Counter';
import { useState } from 'react';
import './App.css'
function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };
  const [count, setCount] = useState(0)

  return (
    <>
     <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  <div>
      <h1>My Favorite Users</h1>
    </div>
     <div>
      <Header />
      <MainContent />
      <Footer />
       <Counter /> 
    </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
