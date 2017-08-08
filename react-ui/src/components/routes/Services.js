import React from 'react';
import PropTypes from 'prop-types';

const Services = (props) => {
  const keyArr = Object.keys(props.data);

  const contentService = (key) => (
    (props.data[key]).map((s) => (
      <div className="content">
        <h3 className="pretty text-center">{key}</h3>
        <div className="flex-container">
          <div className="service text-center">
            <h4>{s["service"]}</h4>
            <h3><i className={s["icon"]} aria-hidden="true"></i></h3>
          </div>
        </div>
      </div>
    ))
  );

  const areaContent = (props.data[keyArr[2]]).map((a) => (
    <h4 key={a} className="text-center">{a}</h4>
  ));


  return (
    <div>
      <div className="content">
        <h3 className="pretty text-center">{keyArr[2]}</h3>
        <div>{areaContent}</div>
      </div>
        <div>{contentService(keyArr[0])}</div>
        <div>{contentService(keyArr[1])}</div>
    </div>
  );
}

export default Services;

Services.propTypes = {
  data: PropTypes.object.isRequired
}
