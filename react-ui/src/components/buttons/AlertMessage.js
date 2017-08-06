import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';


const AlertMessage = (props) => {
  const style = (props.message.includes("message send")) ? "info" : "warning";

  return (
    <div className="text-center">
      {
        (props.message === '') ?
          <div></div> :
          <Alert bsStyle={style} className="content text-center alertMessage">{props.message}</Alert>
      }
    </div>
  );
}


export default AlertMessage;

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired
};
