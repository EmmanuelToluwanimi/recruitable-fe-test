import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Dashboad from "./pages";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Dashboad />}
          />
          <Route
            path="/home"
            element={<Home />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
