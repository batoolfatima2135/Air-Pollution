import { NavLink, useLocation } from 'react-router-dom';
import settings from '../Assets/settings.png';
import mic from '../Assets/mic.png';
import back from '../Assets/back.png';

const Navbar = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  return (
    <nav className="navbar navbar-expand-lg navbar-expand-sm mx-2 bg-dark">
      {currentUrl.includes('/details') ? <NavLink to="/"><img src={back} alt="back" height="20px" /></NavLink> : null}
      <h3 className="text-light m-0">Air pollution Data</h3>
      <ul className="navbar-nav ms-auto d-flex flex-row">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            <img src={mic} alt="mic" height="30px" />
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            <img src={settings} alt="setting" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
