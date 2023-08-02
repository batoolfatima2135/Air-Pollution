import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import arrow from '../Assets/arrow.png';
import map from '../Assets/map.png';

const Homepage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [selectedAQI, setSelectedAQI] = useState('ALL');
  const [heading, setHeading] = useState('CITIES');
  const { data, isLoading } = useSelector((state) => state.airPollutionData);
  const uniqueCountries = [];
  const uniqueAQI = [];
  const filteredData = useMemo(() => {
    let result = data;

    if (searchInput !== '') {
      result = result.filter((item) => item.name.toLowerCase().includes(searchInput.toLowerCase()));
    } else {
      if (selectedCountry !== 'ALL') {
        result = result.filter((item) => item.country === selectedCountry);
      }

      if (selectedAQI !== 'ALL') {
        result = result.filter((item) => item.aqi.toString() === selectedAQI);
      }
    }

    return result;
  }, [data, searchInput, selectedCountry, selectedAQI]);

  const filteredCountries = data.filter((item) => {
    if (!uniqueCountries.includes(item.country)) {
      uniqueCountries.push(item.country);
      return true;
    }
    return false;
  });
  const filteredAQI = data.filter((item) => {
    if (!uniqueAQI.includes(item.aqi)) {
      uniqueAQI.push(item.aqi);
      return true;
    }
    return false;
  });
  const handleChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);
    if (!value === '') {
      setHeading(`Search results for "${value}"`);
    }
  };

  const handleCountryChange = (event) => {
    const { value } = event.target;
    setSelectedCountry(value);
    if (selectedAQI !== 'ALL' && value !== 'ALL') {
      setHeading(`CITIES IN ${value} WITH AQI ${selectedAQI}`);
    } else {
      setHeading(`CITIES IN ${value}`);
    }
  };

  const handleAQIChange = (event) => {
    const { value } = event.target;
    setSelectedAQI(value);
    if (selectedCountry !== 'ALL' && value !== 'ALL') {
      setHeading(`CITIES IN ${selectedCountry} WITH AQI ${value}`);
    } else {
      setHeading(`CITIES WITH AQI ${value}`);
    }
  };

  const getEmojiFace = (value) => {
    switch (value) {
      case 2:
        return '😊'; // Smiling face for value 1
      case 1:
        return '😄'; // Grinning face for value 2
      case 3:
        return '😐'; // Neutral face for value 3
      case 4:
        return '😕'; // Confused face for value 4
      case 5:
        return '😢'; // Crying face for value 5
      default:
        return '❓'; // A question mark emoji for unknown values
    }
  };
  return (
    <div>
      <header>
        <div className="row m-0 p-0 ">
          <div className="col-12 p-3 text-center">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="input-group-sm d-flex">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    placeholder="Search by city"
                    onChange={handleChange}
                    value={searchInput}
                  />
                  <div className="col-3">
                    <select
                      className="form-select rounded-0 form-select-sm "
                      aria-label="Select"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                    >
                      <option value="ALL">Country</option>
                      {filteredCountries.map((item) => (
                        <option value={item.country} key={item.id}>{item.country}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-3">
                    <select
                      className="form-select form-select-sm  rounded-0"
                      aria-label="Select"
                      value={selectedAQI}
                      onChange={handleAQIChange}
                    >
                      <option value="ALL">AQI</option>
                      {filteredAQI.sort((a, b) => a.aqi - b.aqi).map((item) => (
                        <option value={item.aqi} key={item.id}>{item.aqi}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <h5 className="text-light mt-4"><b>{heading}</b></h5>
          </div>
        </div>
      </header>
      <div className="row bg-dark p-2 w-100">
        <p className="text-light mx-2 m-0"><b>AQI INDEX</b></p>
      </div>
      <div className="row m-0">
        {!isLoading && filteredData.length > 0 ? filteredData.map((item, index) => (
          <div className={`col-6  ${(index + 1) % 4 === 2 || (index + 1) % 4 === 3 ? 'bg-dark' : 'bg-primary'} px-3`} key={item.id}>
            <NavLink to={`/details/${item.id}`} className="text-light text-decoration-none">
              <img src={arrow} alt="arrow" height="20px" className="float-end my-1" />
              <img src={map} alt="map" className="img-fluid" />
              <div className="row justify-content-end align-items-end">
                <div className="col-12 text-end">
                  <p className="text-uppercase m-0"><b>{item.name}</b></p>
                  <p className="m-0">{`${item.state}, ${item.country}`}</p>
                  <p>
                    <b>{`AQI : ${item.aqi}`}</b>
                    {` ${getEmojiFace(item.aqi)}`}
                  </p>
                </div>
              </div>
            </NavLink>
          </div>

        )) : <div className="p-4 pb-0 text-center text-light"><h5 className="m-0 p-0">Nothing found</h5></div>}
        {isLoading && (
          <div className="p-4 text-center text-light"><h5>Loading...</h5></div>
        )}
      </div>
    </div>

  );
};
export default Homepage;
