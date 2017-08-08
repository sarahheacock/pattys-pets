import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AdminActionCreators from '../actions/admin';

//components
import Routes from '../components/Routes';
import Header from '../components/Header';
import Footer from '../components/Footer';

//data
import { data, footer } from '../../../data/data';


class App extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    rate: PropTypes.array.isRequired,
    message: PropTypes.string.isRequired,
    edit: PropTypes.object.isRequired
  }


  render(){
    const{ dispatch, user, rate, message, edit } = this.props;
    //turns an object whose values are action creators (functions)
    //and wraps in dispatch (what causes state change)

    const updateState = bindActionCreators(AdminActionCreators.updateState, dispatch);
    const getData = bindActionCreators(AdminActionCreators.getData, dispatch);
    const putData = bindActionCreators(AdminActionCreators.putData, dispatch);
    const postData = bindActionCreators(AdminActionCreators.postData, dispatch);
    const deleteData = bindActionCreators(AdminActionCreators.deleteData, dispatch);


    console.log("");
    console.log("user", user);
    console.log("dataContent", data);
    console.log("rate", rate);
    console.log("message", message);
    console.log("edit", edit);


    return (
      <BrowserRouter>
        <div className="container-fluid">

          <Header
            user={user}
            links={[...Object.keys(data)]}

            getData={getData}
            updateState={updateState}
          />

          <Routes
            data={{
              ...data,
              rates: {
                ...data.rates,
                rate: [...rate]
              }
            }}
            user={user}
            message={message}

            updateState={updateState}
          />

          <Footer
            edit={edit}
            user={user}
            message={message}
            data={footer}

            putData={putData}
            postData={postData}
            deleteData={deleteData}
            updateState={updateState}
          />
        </div>

      </BrowserRouter>

    );
  }
}

const mapStateToProps = state => (
  {
    user: state.user,
    rate: state.rate,
    message: state.message,
    edit: state.edit
  }
);


export default connect(mapStateToProps)(App);
