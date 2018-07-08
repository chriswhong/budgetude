import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';


class Agency extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { uoas: null };
  }

  componentDidMount() {
    const { agencyid } = this.props.match.params;
    this.fetchData(agencyid);
  }

  componentWillReceiveProps(nextProps) {
    const { agencyid } = this.state;
    const { agencyid:nextAgencyid } = nextProps.match.params;

    if ( agencyid !== nextAgencyid) this.fetchData(nextAgencyid);
  }

  fetchData(agencyid) {
    fetch(`http://localhost:3000/budget/agency/${agencyid}`)
      .then(d => d.json())
      .then((data) => {
        this.setState({
          uoas: data,
          agencyid,
        })
      })
  }

  render() {
    const { agencyid } = this.props.match.params;
    const { uoas } = this.state;

    if (!uoas) return null;

    return (
      <ul>
        {uoas.map((uoa) => {
          const { uoaname, uoaid, total } = uoa;
          const displayTotal = numeral(total).format('0.0a');
          return (
            <li key={uoaid}>
              <Link to={`/agency/${agencyid}/uoa/${uoaid}`}>{uoaname}</Link>
              ${displayTotal}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Agency;
