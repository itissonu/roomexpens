
import {
 BrowserRouter,Route,Routes,
} from "react-router-dom";
import { Home } from "./pages/home/Home";
import { List } from "./pages/list/List";
import { Hotel } from "./pages/hotel/Hotel";
import { Login } from "./pages/login/Login";
import {SuccessPage} from "./pages/success/Success";
import {Type} from "./pages/type/Type"
import { ImageSlider } from "./components/imgslide/ImageSlide";
import { Register } from "./pages/login/register";

function App() {
  const imageUrls = [
    'https://images.freeimages.com/images/large-previews/b6b/hotel-room-1217627.jpg',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://plus.unsplash.com/premium_photo-1681922761181-ee59fa91edc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
  ];
  
  return (
    <>
 <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/hotels" element={<List/>}/>
    <Route path="/hotels/:id" element={<Hotel/>}/>
    <Route path="/login"  element={<Login/>}/>
    <Route path="/register"  element={<Register/>}/>
    <Route path="/success"  element={<SuccessPage/>}/>
    <Route path="/type"  element={<Type/>}/>
    <Route path="/slider" element={<ImageSlider  images={imageUrls}/>}/>
  </Routes>
 </BrowserRouter>
    </>
  );
}

export default App;
