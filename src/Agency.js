import React, { Component } from 'react';
import Card from './Card';
import BarChart from './BarChart';

class Agency extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      agencyname: null,
      uoas: null,
    };
  }

  componentDidMount() {
    const { apiPath } = this.props;
    this.fetchData(apiPath);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', this.props, nextProps)
    const {refreshOn} = this.props;
    const {refreshOn: nextrefreshOn, apiPath} = nextProps;

    if (refreshOn !== nextrefreshOn) this.fetchData(apiPath);
  }

  fetchData(apiPath) {
    fetch(`${process.env.REACT_APP_HOST}${apiPath}`)
      .then(d => d.json())
      .then((data) => {
        const { agencyname, children } = data
        
        this.setState({ 
          agencyname,
          children,
        })
      })
  }

  render() {
    const { agencyname, children } = this.state;
    const { linkPrefix, activeSegments, title, activeTitle, inactiveTitle, activeOn, history} = this.props;
    const isActive = (activeOn === undefined);
    if (!children) return null;

    
    
    return (
      <div>
          {/*<div className="col-md-12 px-0">
            <h3>{agencyname}</h3>
            <p className="small">REGULATES MATTERS AFFECTING PUBLIC HEALTH IN THE CITY, INCLUDING THE PROTECTION OF HEALTH AND THE SANITARY SUPERVISION OF FOOD AND
WATER; OVERSEES THE PROVISION OF MATERNAL AND CHILD HEALTH, SCHOOL HEALTH AND COMMUNICABLE DISEASE PREVENTION; CONDUCTS PROGRAMS
AND INVESTIGATIONS IN THE FIELD OF ENVIRONMENTAL HEALTH; COMPILES AND MAINTAINS VITAL RECORDS AND STATISTICS; AND, THROUGH THE
OFFICE OF THE CHIEF MEDICAL EXAMINER, INVESTIGATES VIOLENT, SUSPICIOUS, SUDDEN AND UNEXPECTED DEATHS AND PERFORMS AUTOPSIES. IN
ADDITION, THE DEPARTMENT PLANS AND ADMINISTERS THE PROVISION OF MENTAL HEALTH, DEVELOPMENTAL DISABILITIES, ALCOHOLISM, CHEMICAL
DEPENDENCY AND SUBSTANCE ABUSE SERVICES.</p>
            <p className="lead"><a href="#" className="text-white font-weight-bold">Continue reading...</a></p>
          </div>*/}
          <div className="col-md-12 px-0">
            <BarChart 
              data={children}
              history={history}
              linkPrefix={linkPrefix}
            />
          </div>
      </div>
    );
  }
}

export default Agency;
