import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <main>
      <Routes>
        <Route exact path="/home/:accessToken" element={<Home />} />
        <Route exact path="/404" element={<ErrorPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </main>
  );
};

export default App;
