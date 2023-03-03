import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './views/LandingPage';
import NotFound from './views/NotFound';
import MetamaskNotInstalled from './views/MetamaskNotInstalled';

const App = () => {
  return (
    <div className="App">
      <header className="App-Container">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<LandingPage />} />
            <Route path={'/metamask-error'} element={<MetamaskNotInstalled />} />
            <Route path={'*'} element={<NotFound />} />
          </Routes>
        </BrowserRouter> 
        <Footer />
      </header>
    </div>
  );
}

export default App;
