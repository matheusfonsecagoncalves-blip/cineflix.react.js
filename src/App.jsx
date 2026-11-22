import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Detalhes from "./pages/Detalhes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/filme/:id" element={<Detalhes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;