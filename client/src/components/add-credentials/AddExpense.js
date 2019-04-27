import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMileage } from '../../actions/carprofileActions';
import { addMaintenance } from '../../actions/carprofileActions';
import { addExpense } from '../../actions/carprofileActions';
import SelectListGroup from '../common/SelectListGroup';

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeofexpense: '',
      edate: '',
      description: '',
      totalamount: '',
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
    const addExp = {
      typeofexpense: this.state.typeofexpense,
      edate: this.state.edate,
      description: this.state.description,
      totalamount: this.state.totalamount,
    };
    this.props.addExpense(addExp, this.props.history);
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
      <div className="add-expense">
        <div className="container">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
      </Link>
            <h1 className="display-4 text-center">Add Expense</h1>
            <p className="lead text-center"> Add Expense records for your vehicle</p>
            <small className="d-block pb-3">*= required fields</small>
            <form onSubmit={this.onSubmit}>

              <label htmlFor="typeofexpense" className="form-check-label">
                Type of expense
                  </label>
              <SelectListGroup
                placeholder="* Select Expense"
                name="typeofexpense"
                options={options}
                value={this.state.typeofexpense}
                onChange={this.onChange}
                error={errors.typeofexpense}
              />


              <label htmlFor="edate" className="form-check-label">
                Date
                  </label>
              <TextFieldGroup
                placeholder="* Date"
                name="edate"
                type="date"
                value={this.state.edate}
                onChange={this.onChange}
                error={errors.edate}
              />

              <label htmlFor="description" className="form-check-label">
                Description
                  </label>
              <TextFieldGroup
                placeholder="* description"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
              />

              <label htmlFor="totalamount" className="form-check-label">
                Total AMOUNT
                  </label>
              <TextFieldGroup
                placeholder="* Total Amount"
                name="totalamount"
                value={this.state.totalamount}
                onChange={this.onChange}
                error={errors.totalamount}
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

AddExpense.propTypes = {
  addExpense: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addExpense })(withRouter(AddExpense));