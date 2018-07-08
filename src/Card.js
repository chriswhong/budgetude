import React from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

export default (props) => {
  const {link, title, total, selected} = props;
  const displayTotal = numeral(total).format('0.0a');

  const style = {
    background: selected ? 'gainsboro' : '',
  }
  return (
    <Link to={link}>
      <div className="card" style={style}>
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <strong><div className="display-total">${displayTotal}</div></strong>
        </div>
      </div>
    </Link>
  )
}
