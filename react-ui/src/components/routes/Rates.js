import React from 'react';
import PropTypes from 'prop-types';

const Rates = (props) => {
  console.log("Rates", props.data);
  return (
    <div className="content">
      Rates
    </div>
  );
}

export default Rates;

Rates.propTypes = {
  data: PropTypes.object.isRequired
}
