import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './views/LandingPage';
import NotFound from './views/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <header className="App-Container">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<LandingPage />} />
            <Route path={'*'} element={<NotFound />} />
          </Routes>
        </BrowserRouter> 
        <Footer />
      </header>
    </div>
  );
}

export default App;
