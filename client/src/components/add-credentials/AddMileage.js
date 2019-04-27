import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMileage } from '../../actions/carprofileActions';
import SelectListGroup from '../common/SelectListGroup';

class AddMileage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mdate: '',
      purpose: '',
      odometerstart: '',
      odometerend: '',
      totalmileage: '',
      mcomments: '',
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
    const addMil = {
      mdate: this.state.mdate,
      purpose: this.state.purpose,
      odometerstart: this.state.odometerstart,
      odometerend: this.state.odometerend,
      totalmileage: this.state.totalmileage,
      mcomments: this.state.mcomments
    };
    this.props.addMileage(addMil, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    const { errors } = this.state;

    //Select options for status
    const options = [
      { label: '* Select Purpose', value: 0 },
      { label: 'Business', value: 'Business' },
      { label: 'Personal', value: 'Personal' }
    ];
    return (
      <div className="add-mileage">
        <div className="container">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
      </Link>
            <h1 className="display-4 text-center">Add Mileage</h1>
            <p className="lead text-center"> Add mileage records for your vehicle</p>
            <small className="d-block pb-3">*= required fields</small>
            <form onSubmit={this.onSubmit}>
              <label htmlFor="mdate" className="form-check-label">
                Date
                  </label>
              <TextFieldGroup
                placeholder="* Date"
                name="mdate"
                type="date"
                value={this.state.mdate}
                onChange={this.onChange}
                error={errors.mdate}
              />
              <label htmlFor="purpose" className="form-check-label">
                Purpose
                  </label>
              <SelectListGroup
                placeholder="* Purpose"
                name="purpose"
                options={options}
                value={this.state.purpose}
                onChange={this.onChange}
                error={errors.purpose}
              />
              <label htmlFor="odometerstart" className="form-check-label">
                Odometer start
                  </label>
              <TextFieldGroup
                placeholder="* Odometer Start"
                name="odometerstart"
                value={this.state.odometerstart}
                onChange={this.onChange}
                error={errors.odometerstart}
              />
              <label htmlFor="odometerend" className="form-check-label">
                Odometer end
                  </label>
              <TextFieldGroup
                placeholder="* Odometer End"
                name="odometerend"
                value={this.state.odometerend}
                onChange={this.onChange}
                error={errors.odometerend}
              />
              <label htmlFor="totalmileage" className="form-check-label">
                Total Mileage
                  </label>

              <TextFieldGroup
                placeholder="* Total Mileage"
                name="totalmileage"
                value={this.state.totalmileage}
                onChange={this.onChange}
                error={errors.totalmileage}
              />
              <label htmlFor="Comments" className="form-check-label">
                Comments
                  </label>
              <TextFieldGroup
                placeholder="* Comments"
                name="mcomments"
                value={this.state.mcomments}
                onChange={this.onChange}
                error={errors.mcomments}
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

AddMileage.propTypes = {
  addMileage: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addMileage })(withRouter(AddMileage));