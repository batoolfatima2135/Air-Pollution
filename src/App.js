import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/custom.scss';
import { fetchData } from './Redux/dataSlice';
import Homepage from './Routes/Homepage';
import Navbar from './Components/Navbar';
import Innerpage from './Routes/Innerpage';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/details/:id" element={<Innerpage />} />
      </Routes>
    </>

  );
}

export default App;
