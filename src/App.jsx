import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header      from './components/Header';
import Footer      from './components/Footer';
import Home        from './pages/Home';
import Catalog     from './pages/Catalog';
import Card        from './pages/Card';
import Contacts    from './pages/Contacts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';   // твій існуючий стиль

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="min-vh-100">
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/catalog"  element={<Catalog />} />
          <Route path="/card/:id" element={<Card />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
export default App;