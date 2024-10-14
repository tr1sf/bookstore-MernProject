import { Outlet } from 'react-router-dom';
import './App.css';
import MyFooter from './components/MyFooter';
import NavBar from './components/NavBar';

function App() {

  return (
    <>
      <NavBar/>
      <div className='min-h-screen'>
        <Outlet/>
      </div>
      <MyFooter/>
    </>
  )
}

export default App
