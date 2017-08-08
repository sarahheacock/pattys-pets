import React from 'react';
import PropTypes from 'prop-types';

import EditButton from '../buttons/EditButton';


const Contact = (props) => {
  const content = props.data["paragraph"].map((p, i) => {
    return <div key={`${i}contact`}>{(i === 0) ?
      <h3 className="pretty">{p}</h3>:
      ((p.includes("fa")) ?
        <h3><EditButton
          user={{}}
          updateState={props.updateState}
          dataObj={{}}
          title="Send Message"
        /></h3> :
        <h4>{p}</h4>)}</div>
  });

  return (
    <div className="content text-center">
      {content}
    </div>
  );
}

export default Contact;

Contact.propsTypes = {
  data: PropTypes.object.isRequired,
  updateState: PropTypes.func.isRequired
}
