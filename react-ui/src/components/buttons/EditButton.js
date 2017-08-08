import React from 'react';
import PropTypes from 'prop-types';
import { NavItem } from 'react-bootstrap';
import moment from 'moment';

import { blogID, initialEdit, messageData, loginData, editData, data } from '../../../../data/data';


const EditButton = (props) => {
  const services = data.services;
  const keys = Object.keys(services);

  const addServices = () => {
    const arr = services[keys[0]].concat(services[keys[1]]);
    let service = {};
    arr.forEach((s) => {
      service[s.service] = ((props.title.includes("Add")) ? true : props.dataObj["services"][s.service]);
    });
    return service;
  }


  const pathArr = window.location.pathname.split('/');
  const page = (pathArr[1] === "") ? "home" : pathArr[1];

  //=====STYLE OF BUTTON DEPENDING ON BUTTON TITLE====================================================
  const style = (props.title.includes("Edit")) ?
    "button orangeButton":
    ((props.title.includes("Add") || props.title.includes("Login")) ?
      "button blueButton":
      ((props.title.includes("Delete")) ?
        "button redButton":
        "button"));


  //=====DETERMINE NEXT AND MODAL-TITLE FROM PAGE-SECTION==========================================
  const adminAuth = props.title === "Add" || props.title === "Edit" || props.title === "Delete";

  //NEED if launching modal
  const modalTitle = (adminAuth) ? `${props.title} Service` : props.title;
  let url = '';
  let dataObj = {};
  let message = '';


  //====admin page editting==============
  //props.dataObj will be the selected data point
  if(!(!props.user.token) && adminAuth){

    let result = {};
    if(props.title === "Edit" || props.title === "Add"){
      Object.keys(editData).forEach((key) => {
        if(editData[key]["type"] !== 'other'){
          if(props.title === "Edit"){ //copy everything
            result[key] = props.dataObj[key];
          }
          else if(props.title === "Add"){ //initialize everything to editData
            result[key] = '';
          }
        }
        else { //initialize services checkboxes
          result[key] = addServices();
        }
      });
    }
    else if(props.title === "Delete"){ //only possible in publications and news
      result._id = props.dataObj._id;
    }

    dataObj = Object.assign({}, result);

    if(props.title === "Delete") url = `/page/${blogID}/${props.dataObj._id}?token=${props.user.token}`;
    else if(props.title === "Add") url = `/page/${blogID}?token=${props.user.token}`;
    else if(props.title === "Edit") url = `/page/${blogID}/${props.dataObj._id}?token=${props.user.token}`;

  }
  else if(props.title.includes("Login")) {
    Object.keys(loginData).forEach((k) => dataObj[k] = '');
    url = "/login";
  }
  else if(props.title === "Send Message"){
    Object.keys(messageData).forEach((k) => dataObj[k] = '');
    url = "/sayHello";
  }



  //====THE ACTUAL BUTTON=====================================================

  const content = {
    message: message,
    edit: {
      ...initialEdit,
      modalTitle,
      url,
      dataObj
    }
  };


  //page editing buttons are hidden
  //if we are not updating edit, then navLink to next page
  //...otherwise wait
  const button = (!props.user.token && adminAuth) ?
    <div></div> :
    ((modalTitle === "Send Message") ?
      <a href="#" onClick={(e) => { if(e) e.preventDefault(); props.updateState(content); }}>
        <i className="fa fa-envelope env" aria-hidden="true"></i>
      </a> :
      ((modalTitle === "Login") ?
        <a href="#" onClick={(e) => {
          if(e) e.preventDefault();
          props.updateState(content);
        }} >
          <span className="brand">
            {"Patty's Pet Pals "}<i className="fa fa-paw" aria-hidden="true"></i>
          </span>
        </a> :
        <button className={style} onClick={(e) => { if(e) e.preventDefault(); props.updateState(content); }}>
          {props.title}
        </button>)
      )

  return ( button );
}


export default EditButton;

EditButton.propTypes = {
  user: PropTypes.object.isRequired,
  dataObj: PropTypes.object.isRequired,
  updateState: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};
