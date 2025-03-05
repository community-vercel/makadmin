import { Routes, Route } from "react-router-dom";
import ThemeRoutes from "./routes/Router";

function App() {
  return (
    <Routes>
      {ThemeRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children?.map((child, childIndex) => (
            <Route key={childIndex} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}
    </Routes>
  );
}

export default App;