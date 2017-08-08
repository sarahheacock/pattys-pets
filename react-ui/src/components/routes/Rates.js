import React from 'react';
import PropTypes from 'prop-types';

import EditButton from '../buttons/EditButton';
import { data } from '../../../../data/data';

const Rates = (props) => {
  const services = data.services;
  const keys = Object.keys(services);
  const arr = services[keys[0]].concat(services[keys[1]]);

  const paragraphs = props.data.paragraph.map((p, i) =>
    <p key={`p${i}`}>
      <b>{p}</b>
    </p>
  );

  return (
    <div>
      <div className="flex-container">
        {props.data.rate.map((r) =>
          <div className="content rate" key={r.title}>
            <div className="text-center">
              <h3 className="pretty">{r.title}</h3>
              <p>{r.time}</p>
              <hr />
              <h4>{`$${r.cost}`}</h4>
              <p>{r.description}</p>
              <br />
              <div>{(arr).map((s, i) => {
                return (r.services[s.service]) ?
                  <p className="yes" key={s.service}><i className="fa fa-check" aria-hidden="true"></i>{` ${s.service}`}</p> :
                  <p className="no" key={s.service}><i className="fa fa-times" aria-hidden="true"></i>{` ${s.service}`}</p>
              })}</div>

              <EditButton
                user={props.user}
                updateState={props.updateState}
                dataObj={r}
                title="Edit"
              />
              <EditButton
                user={props.user}
                updateState={props.updateState}
                dataObj={r}
                title="Delete"
              />

            </div>
          </div>
        )}
      </div>
      <div className="text-center">{paragraphs}</div>
    </div>
  );
}

export default Rates;

Rates.propTypes = {
  data: PropTypes.object.isRequired
}
