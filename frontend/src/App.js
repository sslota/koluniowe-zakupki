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
import AuthGuard from "./AuthGuard";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<AuthGuard element={Lists} />} />
      <Route path="/list" element={<AuthGuard element={Lists} />} />
      <Route path="/list-add" element={<AuthGuard element={ListAdd} />} />
      <Route
        path="/list/:id/:name/route"
        element={<AuthGuard element={Map} />}
      />
      <Route
        path="/list/:id/:name/add-product"
        element={<AuthGuard element={AddProductToList} />}
      />
      <Route
        path="/list/:id/:name"
        element={<AuthGuard element={SpecificList} />}
      />
      <Route path="/profile" element={<AuthGuard element={Profile} />} />
      <Route path="/friend" element={<AuthGuard element={Friends} />} />
      <Route path="/friend-add" element={<AuthGuard element={FriendAdd} />} />
      <Route path="/group-make" element={<AuthGuard element={GroupMake} />} />
      <Route path="/product" element={<AuthGuard element={Products} />} />
      <Route path="/product-add" element={<AuthGuard element={ProductAdd} />} />
      <Route path="/shop" element={<AuthGuard element={Shops} />} />
      <Route path="/shop-add" element={<AuthGuard element={ShopAdd} />} />
      <Route path="/blacklist" element={<AuthGuard element={Blacklist} />} />
      <Route
        path="/blacklist-add"
        element={<AuthGuard element={BlacklistAdd} />}
      />
      <Route path="/tag" element={<AuthGuard element={Tags} />} />
      <Route path="/tag-add" element={<AuthGuard element={TagAdd} />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default App;
