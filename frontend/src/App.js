import "./App.css";
import { Routes, Route } from "react-router-dom";
import Lists from "./components/Lists";
import SpecificList from "./components/SpecificList";
import SignIn from "./components/authentications/SignIn";
import SignUp from "./components/authentications/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Lists />} />
      <Route path="/list" element={<Lists />} />
      <Route path="/list/:id" element={<SpecificList />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default App;
