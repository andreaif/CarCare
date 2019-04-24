import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

class CreateCarProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      caryear: '',
      carname: '',
      carmake: '',
      carmodel: '',
      cartrim: '',
      errors: {}
    }
  }
  render() {
    return (
      <div className="create-carprofile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Create Your Vehicle Profile</h1>
              <p className="lead text-center">
                Let's get some vehicle information
          </p>
              <small className="d-block pb-3">
                * = required field</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateCarProfile.propTypes = {
  carprofile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  carprofile: state.profile,
  errors: state.errors,
})

export default connect(mapStateToProps)(CreateCarProfile);