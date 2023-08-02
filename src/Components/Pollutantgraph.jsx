import React from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const PollutantGraph = ({ components }) => {
  const data = Object.entries(components).map(([pollutant, level]) => ({
    pollutant,
    level,
  }));

  return (
    <div data-testid="pollutant-graph" className="row justify-content-center">
      <div className="col-10 bg-light rounded my-2 py-4">
        <AreaChart width={300} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#000000" />
          <XAxis dataKey="pollutant" stroke="#000000" tick={{ fontSize: 12 }} />
          <YAxis stroke="#000000" />
          <Tooltip contentStyle={{ border: '1px solid #be1a51', color: 'white' }} labelStyle={{ color: '#be1a51' }} />
          <Legend />
          <Area type="monotone" dataKey="level" stroke="#be1a51" fill="#be1a51" strokeWidth={2} />
        </AreaChart>
      </div>
    </div>

  );
};
PollutantGraph.propTypes = {
  components: PropTypes.objectOf(PropTypes.number).isRequired,
};
export default PollutantGraph;
