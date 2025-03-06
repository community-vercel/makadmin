import { useEffect } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import Themeroutes from "./routes/Router";

const App = () => {
  const routing = useRoutes(Themeroutes);
  const location = useLocation();

  
  useEffect(() => {

    // Force reloading components when URL changes
    window.scrollTo(0, 0); 
  }, [location]);


  return <div className="dark">{routing}</div>;
};

export default App;