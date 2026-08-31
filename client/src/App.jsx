import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import NewsDetails from "./pages/newsDetails";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <Routes>

      {/* Main website - no login required */}
      <Route path="/" element={<Home />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Registration */}
      <Route path="/register" element={<Register />} />

      {/* News details */}
      <Route path="/news/:id" element={<NewsDetails />} />

    </Routes>
  );
}

export default App;