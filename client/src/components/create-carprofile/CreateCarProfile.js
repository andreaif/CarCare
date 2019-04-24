import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createcarProfile } from '../../actions/carprofileActions';


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

        const profileData = {
            handle: this.state.handle,
            carname: this.state.carname,
            caryear: this.state.caryear,
            carmake: this.state.carmake,
            carmodel: this.state.carmodel,
            cartrim: this.state.cartrim,
          };
      
          this.props.createcarProfile(profileData, this.props.history);
      }

    onChange(e) {
          this.setState({ [e.target.name]: e.target.value });
        }

  render() {
    const { errors } = this.state;
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
                <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />            
                <TextFieldGroup
                  placeholder="* Car Name"
                  name="carname"
                  value={this.state.carname}
                  onChange={this.onChange}
                  error={errors.carname}
                  info="What's your car name?"
                />
                <TextFieldGroup
                  placeholder="* Car Year"
                  name="caryear"
                  value={this.state.caryear}
                  onChange={this.onChange}
                  error={errors.caryear}
                  info="What's your car year?"
                />
                <TextFieldGroup
                  placeholder="* Car Make"
                  name="carmake"
                  value={this.state.carmake}
                  onChange={this.onChange}
                  error={errors.carmake}
                  info="What's your car make?"
                />
                <TextFieldGroup
                  placeholder="* Car Model"
                  name="carmodel"
                  value={this.state.carmodel}
                  onChange={this.onChange}
                  error={errors.carmodel}
                  info="What's your car model?"
                />
                <TextFieldGroup
                  placeholder="* Car Trim"
                  name="cartrim"
                  value={this.state.cartrim}
                  onChange={this.onChange}
                  error={errors.cartrim}
                  info="What's your car trim?"
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
      </div>
    );
  }
}
CreateCarProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { createcarProfile })(
    withRouter(CreateCarProfile)
  );