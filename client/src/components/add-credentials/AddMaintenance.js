import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMaintenance } from '../../actions/carprofileActions';
import SelectListGroup from '../common/SelectListGroup';

class AddMaintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeofmaintenance: '',
      datecompleted: '',
      nextservicedue: '',
      comments: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const addMaint = {
      typeofmaintenance: this.state.typeofmaintenance,
      datecompleted: this.state.datecompleted,
      nextservicedue: this.state.nextservicedue,
      comments: this.state.comments
    };
    this.props.addMaintenance(addMaint, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    const { errors } = this.state;

    //Select options for status
    const options = [
      { label: '* Select Type of Maintenance', value: 0 },
      { label: 'Oil/oil filter changed', value: 'Oil/oil filter changed' },
      { label: 'Wiper blades replacement', value: 'Wiper blades replacement' },
      { label: 'Replace air filter', value: 'Replace air filter' },
      { label: 'New tires', value: 'New tires' },
      { label: 'Battery replacement', value: 'Battery replacement' },
      { label: 'Brake work', value: 'Brake work' },
      { label: 'Antifreeze added', value: 'Antifreeze added' },
      { label: 'Engine tune-up', value: 'Engine tune-up' },
      { label: 'Wheels aligned/balanced', value: 'Wheels aligned/balanced' },
    ];

    return (
      <div className="add-maintenance">
        <div className="container">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
      </Link>
            <h1 className="display-4 text-center">Add Maintenance</h1>
            <p className="lead text-center"> Add maintenace records for your vehicle</p>
            <small className="d-block pb-3">*= required fields</small>
            <form onSubmit={this.onSubmit}>
              <label htmlFor="typeofmaintenance" className="form-check-label">
                Type of Maintenance
                  </label>

              <SelectListGroup
                placeholder="* Type of Maintenance"
                name="typeofmaintenance"
                options={options}
                value={this.state.typeofmaintenance}
                onChange={this.onChange}
                error={errors.typeofmaintenance}
              />
              <label htmlFor="datecompleted" className="form-check-label">
                Date Completed
                  </label>
              <TextFieldGroup
                placeholder="* Date Completed"
                name="datecompleted"
                type="date"
                value={this.state.datecompleted}
                onChange={this.onChange}
                error={errors.datecompleted}
              />
              <label htmlFor="nextservicedue" className="form-check-label">
                Next Service Due
                  </label>
              <TextFieldGroup
                placeholder="* Next Service Due"
                name="nextservicedue"
                type="date"
                value={this.state.nextservicedue}
                onChange={this.onChange}
                error={errors.nextservicedue}
              />
              <label htmlFor="comments" className="form-check-label">
                Comments
                  </label>
              <TextFieldGroup
                placeholder="* Comments"
                name="comments"
                value={this.state.comments}
                onChange={this.onChange}
                error={errors.comments}
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

AddMaintenance.propTypes = {
  addMaintenance: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addMaintenance })(withRouter(AddMaintenance));