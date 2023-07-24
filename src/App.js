import { Route, Routes } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Routes/Homepage';
import Innerpage from './Routes/Innerpage';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/details/:id" element={<Innerpage />} />
      </Routes>
    </div>
  );
}

export default App;
