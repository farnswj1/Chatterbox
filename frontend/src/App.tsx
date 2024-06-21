import { FC } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { Home } from 'pages';
import { Footer, Header } from 'layouts';

const App: FC = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
