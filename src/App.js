import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./homepage/home";
import Login from "./login/login";

function App() {
  const authToken = localStorage.getItem("authToken");

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/"
            element={
              authToken === "Success" ? <Navigate to="/home" /> : <Login />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
