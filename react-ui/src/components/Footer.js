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

        uploadFile={props.uploadFile}
        putData={props.putData}
        postData={props.postData}
        deleteData={props.deleteData}

        updateState={props.updateState}
      />

      <Row className="clearfix">
        <Col sm={6}>
          <h3 className="pretty">This page was built with</h3>
          <h3><i className="fa fa-heart" aria-hidden="true"></i> and <i className="fa fa-coffee" aria-hidden="true"></i></h3>
          <h4>by Sarah Heacock</h4>
          <br />
        </Col>

        <Col sm={6}>
          <h3 className="pretty">Contact Patty by</h3>
          <h3><i className="fa fa-phone" aria-hidden="true"></i> or
            <EditButton
              user={props.user}
              updateState={props.updateState}
              dataObj={{}}
              title="Send Message"
            />
          </h3>
          <h4>{props.data.rowOne[0]}</h4>
          <h4>{props.data.rowOne[1]}</h4>
          <br />
        </Col>
      </Row>
      <hr />
      <div>{props.data.rowTwo.map((d, i) => <p key={`${i}rowTwo`}><b>{d}</b></p>)}<h3><i className="fa fa-paw" aria-hidden="true"></i></h3></div>

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
