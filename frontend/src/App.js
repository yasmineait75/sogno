import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BreizhPage from "./pages/BreizhPage";
import SognoPage from "./pages/SognoPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BreizhPage />} />
          <Route path="/sogno" element={<SognoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
