import React from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

export default (props) => {
  const {link, title, total, selected} = props;
  const displayTotal = numeral(total).format('0.0a');

  let selectedClass = '';

  if (selected !== null) selectedClass = selected ? 'active' : 'disabled';

  const card = (
    <div className={`card ${selectedClass}`}>
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <strong><div className="display-total">${displayTotal}</div></strong>
      </div>
    </div>
  )

  if (link) return <Link to={link}>{card}</Link>

  return card;
}
