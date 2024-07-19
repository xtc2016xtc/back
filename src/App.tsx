import { Navbar } from "./components";
import { Routes, Route } from "react-router-dom";
// import './globals.css'
const App = () => {
 return (
  <>
    <main className="flex h-screen">
      <Routes>
        <Route path="/" element={<Navbar />} />
      </Routes>
    </main>
    </>
  );
}

export default App;