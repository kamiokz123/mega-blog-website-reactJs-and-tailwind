import { useEffect, useState } from 'react';
import { login, logout } from "./store/authSlice.js";
import authServices from './appwrite/auth.js';
import { useDispatch } from 'react-redux';
import Header from './components/header/Header.jsx';
import Footer from "./components/footer/Footer.jsx"
import { Outlet } from 'react-router-dom';


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    authServices.getUserAccount().then(
      (userData) => {
        if (userData) {
          dispatch(login({ userData }))
          setDataUpdate(true)
        } else {
          dispatch(logout());
          setDataUpdate(true)
        }
      }
    ).finally(
      () => setLoading(false)
    )
  }, [])

  return !loading ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
    :
    (
      <>
        loading....
      </>
    );
}

export default App
