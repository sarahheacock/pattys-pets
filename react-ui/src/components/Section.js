import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';

import Home from './routes/Home';
import Services from './routes/Services';
import Rates from './routes/Rates';
import Contact from './routes/Contact';
import EditButton from './buttons/EditButton';


const Section = (props) => {
  //EditButton will make button invisible without token
  const editButton = (props.section === "rates") ?
    <EditButton
      user={props.user}
      updateState={props.updateState}
      dataObj={{}}
      title="Add"
    />:
    <div></div>;


  const section = ((props.section === "home") ?
    <Home data={props.data}/> :
    ((props.section === "services") ?
      <Services data={props.data}/> :
      ((props.section === "rates" && props.data.rate.length > 0) ?
        <Rates data={props.data}  user={props.user} updateState={props.updateState}/> :
        ((props.section === "contact") ?
          <Contact data={props.data} user={props.user} updateState={props.updateState}/> :
          <div></div>))))

  return (
    <div className="main-content">
      <PageHeader><span className="header-text">{`${props.section.charAt(0).toUpperCase()}${props.section.slice(1)}`}</span></PageHeader>
      <div>{section}</div>
      <div className="text-center">{editButton}</div>
    </div>
  );
};

export default Section;

Section.propsTypes = {
  section: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  rate: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,

  updateState: PropTypes.func.isRequired
};
