/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const PollutantGraph = ({ components }) => {
  const data = Object.entries(components).map(([pollutant, level]) => ({
    pollutant,
    level,
  }));
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="pollutant" axisLine={{ strokeWidth: 5 }} stroke="#39812f" tick={{ fontSize: 12 }} />
      <YAxis stroke="#39812f" axisLine={{ strokeWidth: 5 }} />
      <Tooltip contentStyle={{ border: '1px solid #e04a7c', color: 'white' }} labelStyle={{ color: '#e924a7' }} />
      <Legend />
      <Line type="monotone" dataKey="level" stroke="#8884d8" strokeWidth={7} />
    </LineChart>
  );
};
PollutantGraph.propTypes = {
  components: PropTypes.objectOf(PropTypes.number).isRequired,
};
export default PollutantGraph;
