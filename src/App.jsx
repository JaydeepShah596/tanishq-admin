import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutApp from "./layoutapp";
import Dashboard from "./dashboard/dashboard";
import Login from "./auth/login";
import Category from "./category/category";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
          <Route element={<LayoutApp />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/details" element={<Details />} />
            <Route path="/allmembers" element={<AllMembers />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
