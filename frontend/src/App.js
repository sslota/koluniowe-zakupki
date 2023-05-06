import "./App.css";
import { Routes, Route } from "react-router-dom";
import Lists from "./components/lists/Lists";
import SpecificList from "./components/lists/SpecificList";
import SignIn from "./components/authentications/SignIn";
import SignUp from "./components/authentications/SignUp";
import ListAdd from "./components/lists/ListAdd";
import Profile from "./components/socials/Profile";
import Friends from "./components/socials/Friends";
import FriendAdd from "./components/socials/FriendAdd";
import GroupMake from "./components/socials/GroupMake";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Lists />} />
      <Route path="/list" element={<Lists />} />
      <Route path="/list/:id" element={<SpecificList />} />
      <Route path="/list-add" element={<ListAdd />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/friend" element={<Friends />} />
      <Route path="/friend-add" element={<FriendAdd />} />
      <Route path="/group-make" element={<GroupMake />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default App;
