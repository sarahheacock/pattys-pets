import React from 'react';
import PropTypes from 'prop-types';

import { FormGroup, Checkbox, Row, Col } from 'react-bootstrap';


const FormList = (props) => {
console.log("VALUE", props.value);
  //======ALL OF THE FORM GROUPS===================================

  const formGroups = Object.keys(props.value).map((k) =>
    <Checkbox
      key={`services-${k}`}
      name={`services-${k}`}
      value={props.value[k]}
      onChange={props.formChange}
      checked={props.value[k]}
    >{k}</Checkbox>
  );


  //============================================================

  return (
    <FormGroup>
      {formGroups}
    </FormGroup>
  );
}


export default FormList;

FormList.propTypes = {
  value: PropTypes.object.isRequired,
  formChange: PropTypes.func.isRequired
};
