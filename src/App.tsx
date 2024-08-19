import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import { Home } from './Screens/Home';
// import { ProfileView } from './Screens/ProfileView';
import { Products } from './Screens/Products';
import { Manage } from './Screens/Manage';
import { Connections } from './Screens/Connections';
import { CreateProfile } from './Screens/CreateProfile';
import { Register } from './Screens/Register';
import { Login } from './Screens/Login';
import { Welcome } from './Screens/Welcome';
import { ManageProducts } from './Screens/ManageProducts';
import { MyProfile } from './Screens/MyProfile';




function App() {
  return (
    <div className="App">
        <Routes>
             <Route path='/' element={<Home/>} />
             {/* <Route path="/profile/view/:username" element={<ProfileView/>} /> */}
             <Route path="/profile/products" element={<Products/>} />
             <Route path="/manage/profile" element={<Manage/>} />
             <Route path="/manage/products" element={<ManageProducts />} />
             {/* <Route path="/manage/connections" element={<Connections/>} /> */}
             <Route path="/business/profile/create" element={<CreateProfile/>} />
             <Route path="/authenticate/register" element={<Register/>} />
             <Route path="/authenticate/login" element={<Login/>} />
             <Route path="/welcome" element={<Welcome/> } />
             <Route path="/myProfile" element={<MyProfile />}>
                <Route path="/myProfile/connections" element={<Connections />} />
                <Route path="/myProfile/products" element={<Products />} />
             </Route>
        </Routes>
    </div>
  );
}

export default App;
