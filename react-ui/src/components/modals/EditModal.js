import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

import EditForm from '../forms/EditForm';

class EditModal extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    edit: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,

    putData: PropTypes.func.isRequired,
    postData: PropTypes.func.isRequired,
    deleteData: PropTypes.func.isRequired,

    updateState: PropTypes.func.isRequired,
  }


  onFormChange = (e) => {

    let dataObj = {...this.props.edit.dataObj};
    const nameArr = e.target.name.split('-');
    const value = e.target.value;

    if(nameArr.length > 1){
      dataObj[nameArr[0]][nameArr[1]] = !dataObj[nameArr[0]][nameArr[1]];
    }
    else {
      dataObj[nameArr[0]] = value;
    }


    this.props.updateState({
      edit: {
        ...this.props.edit,
        dataObj: dataObj
      },
      message: ''
    });
  }

  render(){

    const title = this.props.edit.modalTitle;
    let editFunc = this.props.postData;
    if(title.includes("Edit")){
      editFunc = this.props.putData;
    }
    else if(title.includes("Delete")){
      editFunc = this.props.deleteData;
    }

    // console.log("editFunc", editFunc);


    return (
      <div>
        <Modal show={Object.keys(this.props.edit.dataObj).length > 0}>
          <Modal.Header>
            <Modal.Title>{this.props.edit.modalTitle}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <EditForm
              formChange={this.onFormChange}
              editData={editFunc}
              updateState={this.props.updateState}

              message={this.props.message}
              user={this.props.user}
              edit={this.props.edit}
            />
          </Modal.Body>

          <Modal.Footer>
            *Fill out required fields
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditModal;
