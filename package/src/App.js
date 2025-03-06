import { useState, useEffect } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import ThemeRoutes from "./routes/Router";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token")); // Check token
  const routing = useRoutes(ThemeRoutes(isAuthenticated)); // Pass authentication status
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll position on route change
  }, [location]);

  return <div className="dark">{routing}</div>;
};

export default App;