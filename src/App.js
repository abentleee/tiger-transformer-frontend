import './App.css';
import Header from './components/Header';
import LandingPage from './features/LandingPage';

const App = () => {
  return (
    <div className="App">
      <header className="App-Container">
        <Header />
        <LandingPage />  
      </header>
    </div>
  );
}

export default App;
