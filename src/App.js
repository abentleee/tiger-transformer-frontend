import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './views/LandingPage';
import NotFound from './views/NotFound';
import MetamaskError from './views/MetamaskError';
import ListAllTigers from './views/ListAllTigers';
import WrongBlockchainError from './views/WrongBlockchainError';

const App = () => {
  return (
    <div className="App">
      <header className="App-Container">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<LandingPage />} />
            <Route path={'/list-all'} element={<ListAllTigers />} />
            <Route path={'/metamask-error'} element={<MetamaskError />} />
            <Route path={'/wrong-blockchain-error'} element={<WrongBlockchainError />} />
            <Route path={'*'} element={<NotFound />} />
          </Routes>
        </BrowserRouter> 
        <Footer />
      </header>
    </div>
  );
}

export default App;
