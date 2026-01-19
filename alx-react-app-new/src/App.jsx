import React from 'react';
import UserProfile from "../../alx-react-app-new/src/components/UserProfile";
import Header from '../../alx-react-app-new/src/components/Header';
import MainContent from '../../alx-react-app-new/src/components/MainContent';
import Footer from '../../alx-react-app-new/src/components/Footer';
import { useState } from 'react';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <div>
      <h1>My Favorite Users</h1>
      <UserProfile
        name="Alice"
        age={25}
        bio="Loves hiking and photography"
      />
      <UserProfile
        name="Bob"
        age={30}
        bio="Enjoys cooking and reading novels"
      />
      <UserProfile
        name="Charlie"
        age={22}
        bio="Passionate about music and travel"
      />
    </div>
     <div>
      <Header />
      <MainContent />
      <Footer />
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
  )
}

export default App;
