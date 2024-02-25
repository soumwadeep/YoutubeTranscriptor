import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Search from "./pages/Search";

const App = () => {
  return (
    <main>
      <Routes>
        <Route exact path="/home/:accessToken" element={<Home />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/404" element={<ErrorPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Navigate to="/search" replace />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </main>
  );
};

export default App;
