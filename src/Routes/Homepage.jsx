import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { fetchData } from '../Redux/dataSlice';
import { NavLink } from 'react-router-dom';
// import PollutantGraph from '../Components/Pollutantgraph';

const Homepage = () => {
  const data = [
    {
      id: 0,
      name: 'Chicago',
      country: 'US',
      state: 'Illinois',
      components: {
        co: 297.07,
        no: 0.46,
        no2: 3.21,
        o3: 120.16,
        so2: 2.27,
        pm2_5: 7.38,
        pm10: 7.75,
        nh3: 0.97,
      },
      aqi: 3,
    },
    {
      id: 1,
      name: 'Seattle',
      country: 'US',
      state: 'Washington',
      components: {
        co: 195.27,
        no: 0.61,
        no2: 2.7,
        o3: 86.55,
        so2: 2.09,
        pm2_5: 4.49,
        pm10: 5.64,
        nh3: 0.22,
      },
      aqi: 2,
    },
    {
      id: 2,
      name: 'San Francisco',
      country: 'US',
      state: 'California',
      components: {
        co: 183.58,
        no: 0.15,
        no2: 0.66,
        o3: 72.24,
        so2: 1,
        pm2_5: 2.93,
        pm10: 4.61,
        nh3: 0,
      },
      aqi: 2,
    },
    {
      id: 3,
      name: 'New York County',
      country: 'US',
      state: 'New York',
      components: {
        co: 327.11,
        no: 0.47,
        no2: 7.88,
        o3: 251.77,
        so2: 9.78,
        pm2_5: 27.18,
        pm10: 28.64,
        nh3: 1.06,
      },
      aqi: 5,
    },
    {
      id: 4,
      name: 'London',
      country: 'GB',
      state: 'England',
      components: {
        co: 287.06,
        no: 0.31,
        no2: 6.86,
        o3: 67.23,
        so2: 4.05,
        pm2_5: 2.99,
        pm10: 5.54,
        nh3: 0.34,
      },
      aqi: 2,
    },
    {
      id: 5,
      name: 'Manchester',
      country: 'GB',
      state: 'England',
      components: {
        co: 195.27,
        no: 2.01,
        no2: 15.25,
        o3: 16.63,
        so2: 2.06,
        pm2_5: 3.64,
        pm10: 4.23,
        nh3: 1.36,
      },
      aqi: 1,
    },
    {
      id: 6,
      name: 'Birmingham',
      country: 'GB',
      state: 'England',
      components: {
        co: 247,
        no: 0.27,
        no2: 4.54,
        o3: 44.35,
        so2: 1.91,
        pm2_5: 2.7,
        pm10: 3.2,
        nh3: 1.22,
      },
      aqi: 1,
    },
    {
      id: 7,
      name: 'City of Edinburgh',
      country: 'GB',
      state: 'Scotland',
      components: {
        co: 191.93,
        no: 0.01,
        no2: 1.25,
        o3: 57.94,
        so2: 0.78,
        pm2_5: 2.02,
        pm10: 5.24,
        nh3: 0.15,
      },
      aqi: 1,
    },
    {
      id: 8,
      name: 'Old Toronto',
      country: 'CA',
      state: 'Ontario',
      components: {
        co: 293.73,
        no: 1.09,
        no2: 11.48,
        o3: 145.91,
        so2: 15.26,
        pm2_5: 15.18,
        pm10: 16.85,
        nh3: 1.66,
      },
      aqi: 4,
    },
    {
      id: 9,
      name: 'Vancouver',
      country: 'CA',
      state: 'British Columbia',
      components: {
        co: 216.96,
        no: 1.45,
        no2: 5.23,
        o3: 85.12,
        so2: 5.84,
        pm2_5: 3.89,
        pm10: 4.81,
        nh3: 0.86,
      },
      aqi: 2,
    },
    {
      id: 10,
      name: 'Montreal',
      country: 'CA',
      state: 'Quebec',
      components: {
        co: 213.62,
        no: 0.91,
        no2: 3.98,
        o3: 95.84,
        so2: 4.41,
        pm2_5: 2.01,
        pm10: 2.37,
        nh3: 0.85,
      },
      aqi: 2,
    },
    {
      id: 11,
      name: 'Calgary',
      country: 'CA',
      state: 'Alberta',
      components: {
        co: 223.64,
        no: 0.3,
        no2: 1.39,
        o3: 81.54,
        so2: 1.24,
        pm2_5: 5.07,
        pm10: 5.36,
        nh3: 2.19,
      },
      aqi: 2,
    },
    {
      id: 12,
      name: 'Shanghai',
      country: 'CN',
      components: {
        co: 6782.53,
        no: 346.9,
        no2: 119.27,
        o3: 0,
        so2: 709.53,
        pm2_5: 259.66,
        pm10: 301.61,
        nh3: 0,
      },
      aqi: 5,
    },
    {
      id: 13,
      name: 'Beijing',
      country: 'CN',
      state: 'Beijing',
      components: {
        co: 781.06,
        no: 73.31,
        no2: 42.5,
        o3: 0,
        so2: 31.47,
        pm2_5: 96.73,
        pm10: 116.47,
        nh3: 10.13,
      },
      aqi: 5,
    },
    {
      id: 14,
      name: 'Hong Kong Island',
      country: 'CN',
      state: 'Hong Kong',
      components: {
        co: 297.07,
        no: 4.08,
        no2: 25.36,
        o3: 1.13,
        so2: 45.3,
        pm2_5: 21.12,
        pm10: 24.82,
        nh3: 0,
      },
      aqi: 2,
    },
    {
      id: 15,
      name: 'Shenzhen',
      country: 'CN',
      state: 'Guangdong Province',
      components: {
        co: 781.06,
        no: 67.06,
        no2: 47.98,
        o3: 0,
        so2: 106.81,
        pm2_5: 78.93,
        pm10: 89.12,
        nh3: 0,
      },
      aqi: 5,
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchData());
  }, [dispatch]);
  return (
    <div className="row">
      {data.map((item) => (
        <div className="col-6 border bg-success text-light" key={item.id}>
          <NavLink to={`/details/${item.id}`} className="text-light">
            <p>{item.id}</p>
            <p>{item.name}</p>
            <p>{item.aqi}</p>
            <p>{item.country}</p>
          </NavLink>
        </div>

      ))}
    </div>
  );
};
export default Homepage;
