import React from 'react';
import PropTypes from 'prop-types';


const Rates = (props) => {
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
              <div>{(r.services).map((s, i) => {
                return (s.offered) ?
                  <p className="yes" key={`${i}${r.title}`}><i className="fa fa-check" aria-hidden="true"></i>{` ${s.service}`}</p> :
                  <p className="no" key={`${i}${r.title}`}><i className="fa fa-times" aria-hidden="true"></i>{` ${s.service}`}</p>
              })}</div>
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
