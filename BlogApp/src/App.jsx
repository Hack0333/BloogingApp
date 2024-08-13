import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authServices from './appWirte/authServices';
import {login,logout} from './features/authSlice'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {

  const [isLoading , setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authServices.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        dispatch(login({userData}))
      }else{
        dispatch(logout());
      }
    })
    .finally(()=>setIsLoading(false))
  },[])
  
  return !isLoading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <Footer />
      </div>
    </div>
  ) : <h1>Loading User Data Plz Wait</h1>
}

export default App
