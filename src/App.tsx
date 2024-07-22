// import { Navbar } from "./components";
import { Routes, Route } from "react-router-dom";
import SigninFrom from './_auth/forms/SigninFrom';
import SignupFrom from './_auth/forms/SignupFrom';
import { Home } from './_root/pages'
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import './globals.css'
const App = () => {
  return (
    <>
      <main className="flex h-screen">
        <Routes>
          {/* public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninFrom />} />
            <Route path="/sign-up" element={<SignupFrom />} />
          </Route>

          {/* private routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>

        </Routes>
      </main>
    </>
  );
}

export default App;