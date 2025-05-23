// import logo from './logo.svg';
// import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar.component';
import UserAuthForm from './pages/userAuthForm.page';
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session.jsx";
import Editor from './pages/editor.pages.jsx';
import HomePage from './pages/home.page.jsx'; 
import SearchPage from './pages/search.page.jsx';

export const UserContext = createContext({})



function App() {


  const [userAuth, setUserAuth] = useState({});


  useEffect(() => {

    const accessToken = lookInSession("accessToken")
    const refreshToken = lookInSession("refreshToken")
    const user = lookInSession("user")
    let userInSession = { accessToken, refreshToken, user }
    userInSession ? setUserAuth(userInSession) : setUserAuth({ accessToken: null })

  }, []);


  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>

      <Routes>
        <Route path="/editor" element={<Editor />} />

        <Route path='/' element={<Navbar />} >
          <Route index element={<HomePage />} />
          <Route path='signin' element={<UserAuthForm type="sign-in" />} />
          <Route path='signup' element={<UserAuthForm type="sign-up" />} />
          <Route path='search/:query' element={<SearchPage />} />
        </Route>
      </Routes>

    </UserContext.Provider>

  );
}

export default App;
