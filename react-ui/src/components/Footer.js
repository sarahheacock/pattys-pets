import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

import EditModal from '../components/modals/EditModal';
import EditButton from '../components/buttons/EditButton';


const Footer = (props) => {
  return (
    <footer className="text-center">

      <EditModal
        user={props.user}
        edit={props.edit}
        message={props.message}

        putData={props.putData}
        postData={props.postData}
        deleteData={props.deleteData}

        updateState={props.updateState}
      />

      <Row className="clearfix">
        <Col sm={6}>
         <hr />
          <h3 className="pretty">This page was built with</h3>
          <h3><i className="fa fa-heart footer-icon" aria-hidden="true"></i> and <i className="fa fa-coffee footer-icon" aria-hidden="true"></i></h3>
          <h4>by Sarah Heacock</h4>
          <br />
          <hr />
        </Col>

        <Col sm={6}>
          <hr />
          <h3 className="pretty">Contact Patty by</h3>
          <h3><i className="fa fa-phone footer-icon" aria-hidden="true"></i> or
            <EditButton
              user={props.user}
              updateState={props.updateState}
              dataObj={{}}
              title="Send Message"
            />
          </h3>
          <h4>{props.data.rowOne[0]} <br /> {props.data.rowOne[1]}</h4>
          <hr />
        </Col>
      </Row>

      <br />
      <div>{props.data.rowTwo.map((d, i) => <p key={`${i}rowTwo`}><b>{d}</b></p>)}</div>
      <h3 className='text-center'><i className="fa fa-paw footer-icon" aria-hidden="true"></i></h3>

    </footer>

  );
}


export default Footer;

Footer.propTypes = {
  user: PropTypes.object.isRequired,
  edit: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,

  putData: PropTypes.func.isRequired,
  postData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,

  updateState: PropTypes.func.isRequired,
};
