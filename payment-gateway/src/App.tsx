import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/home';
import DetailProduct from './Home/detail_product';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<DetailProduct />} />
      </Routes>
    </BrowserRouter>
  );
}