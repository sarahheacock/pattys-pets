import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'react-bootstrap';
import { Image } from 'cloudinary-react';
import { cloudName } from '../../../../data/data';


const Home = (props) => {
  const contentKeys = (Object.keys(props.data));

  return (
    <div>

      <div className="content">
        <h3 className="pretty text-center">{contentKeys[0]}</h3>
        <div className="row-content">
          <Row className="clearfix">
            <Col sm={4}>
              <Image
                cloudName={cloudName}
                publicId={props.data[contentKeys[0]]["image"]}
                width="200"
                radius="20"
                crop="scale"/>
            </Col>
            <Col sm={8}>
              <h4 className="text-center ">{props.data[contentKeys[0]]["p"]}</h4>
            </Col>
          </Row>
        </div>
      </div>

      <div className="content">
        <h3 className="pretty text-center">{contentKeys[1]}</h3>
        <div className="row-content">
          <Row className="clearfix">
            <h4 className="text-center ">{props.data[contentKeys[1]]["p"]}</h4>
          </Row>
        </div>
      </div>

      <div className="content">
        <h3 className="pretty text-center">{contentKeys[2]}</h3>
        <div className="row-content">
          <Row className="clearfix">
            <h4 className="text-center ">{props.data[contentKeys[2]]["p"]}</h4>
          </Row>
        </div>
      </div>

    </div>
  );
}

export default Home;

Home.propsTypes = {
  data: PropTypes.object.isRequired
}
