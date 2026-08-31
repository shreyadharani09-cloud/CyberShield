import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import NewsDetails from "./pages/newsDetails";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <Routes>

      {/* Main website - no login required */}
      <Route path="/" element={<home />} />

      {/* Login */}
      <Route path="/login" element={<login />} />

      {/* Registration */}
      <Route path="/register" element={<register />} />

      {/* News details */}
      <Route path="/news/:id" element={<newsDetails />} />

    </Routes>
  );
}

export default App;