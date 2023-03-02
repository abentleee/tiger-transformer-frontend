import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './views/LandingPage';

const App = () => {
  return (
    <div className="App">
      <header className="App-Container">
        <Header />
        <LandingPage />  
        <Footer />
      </header>
    </div>
  );
}

export default App;
