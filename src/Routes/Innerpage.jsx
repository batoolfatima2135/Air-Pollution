import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PollutantGraph from '../Components/Pollutantgraph';
import map from '../Assets/map.png';

const Innerpage = () => {
  const data = useSelector((state) => state.airPollutionData.data);
  const { id } = useParams();
  const item = data.find((item) => item.id === id);
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
    <>
      <div className="py-5 m-0 row justify-content-center" style={{ backgroundImage: `url(${map})`, backgroundSize: 'cover' }}>
        <div className="col-10 text-center text-light">
          <h1>
            {item.name}
            {` ${getEmojiFace(item.aqi)}`}
          </h1>
          <p className="m-0"><b>{`${item.state}, ${item.country}`}</b></p>
          <p className="m-0">
            <b>
              {`AQI: ${item.aqi}`}

            </b>
          </p>
        </div>

      </div>
      <div className="row my-3 row justify-content-center">
        <h3 className="text-light text-center bg-dark  p-2">GRAPH</h3>
        <PollutantGraph components={item.components} />
      </div>
      <div className="row justify-content-center">
        <h3 className="text-light bg-dark p-2 text-center">DATA</h3>
        <div className="col-11 text-center">
          <table className="table table-bordered border-primary">
            <thead>
              <tr>
                <th scope="col" className="text-start text-dark">POLLUTANT</th>
                <th scope="col" className="text-dark">LEVEL</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(item.components).map(([pollutant, level]) => (
                <tr key={level}>
                  <td className="text-start">{pollutant}</td>
                  <td>{level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>

  );
};
export default Innerpage;
