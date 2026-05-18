import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SognoPage from "./pages/SognoPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SognoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
