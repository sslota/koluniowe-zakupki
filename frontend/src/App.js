import "./App.css";
import { Routes, Route } from "react-router-dom";
import Lists from "./components/lists/Lists";
import SignIn from "./components/authentications/SignIn";
import SignUp from "./components/authentications/SignUp";
import ListAdd from "./components/lists/ListAdd";
import Map from "./components/lists/navigations/Map";
import Profile from "./components/socials/Profile";
import Friends from "./components/socials/Friends";
import FriendAdd from "./components/socials/FriendAdd";
import GroupMake from "./components/socials/GroupMake";
import Products from "./components/products/Products";
import ProductAdd from "./components/products/ProductAdd";
import Shops from "./components/shops/Shops";
import ShopAdd from "./components/shops/ShopAdd";
import Blacklist from "./components/shops/blacklist/Blacklist";
import BlacklistAdd from "./components/shops/blacklist/BlacklistAdd";
import Tags from "./components/tags/Tags";
import TagAdd from "./components/tags/TagAdd";
import SpecificList from "./components/lists/list/SpecificList";
import AddProductToList from "./components/lists/list/AddProductToList";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Lists />} />
      <Route path="/list" element={<Lists />} />
      <Route path="/list-add" element={<ListAdd />} />
      <Route path="/list/:id/route" element={<Map />} />
      <Route path="/list/:id/add-product" element={<AddProductToList />} />
      <Route path="/list/:id" element={<SpecificList />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/friend" element={<Friends />} />
      <Route path="/friend-add" element={<FriendAdd />} />
      <Route path="/group-make" element={<GroupMake />} />
      <Route path="/product" element={<Products />} />
      <Route path="/product-add" element={<ProductAdd />} />
      <Route path="/shop" element={<Shops />} />
      <Route path="/shop-add" element={<ShopAdd />} />
      <Route path="/blacklist" element={<Blacklist />} />
      <Route path="/blacklist-add" element={<BlacklistAdd />} />
      <Route path="/tag" element={<Tags />} />
      <Route path="/tag-add" element={<TagAdd />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about-us" element={<Lists />} />
    </Routes>
  );
}

export default App;
