import Header from './components/Header';
import MainContent from './components/MainContent';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';
import Counter from './components/Counter';

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <UserProfile
        name="Maame Serwaa"
        age={21}
        bio="An IT student who loves building React applications."
      />
      <Footer />
      <Counter />
    </div>
  );
}

export default App;
