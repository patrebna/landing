import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdPage from "./pages/AdPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ad/:adId/" element={<AdPage />} />
      </Routes>
    </BrowserRouter>
  );
}
