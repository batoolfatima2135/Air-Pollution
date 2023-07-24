import React from 'react';
import { useParams } from 'react-router-dom';

const Innerpage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Item Details</h1>
      <p>{id}</p>
    </div>
  );
};
export default Innerpage;
