import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteCarProfile } from "../../actions/carprofileActions"
import Spinner from "../common/Spinner";
import CarProfileActions from "./CarProfileActions";
import Maintenance from './Maintenance';
import Mileage from './Mileage';
import Expense from './Expense';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick() {
    this.props.deleleCarProfile();
  }


  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has car profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
            <CarProfileActions />
            <Maintenance maintenance={profile.maintenance} />
            <Mileage mileage={profile.mileage} />
            <Expense expense={profile.expense} />
            <div style={{ marginBottom: '60px' }} />
            <button onclick={this.onDeleteClick.bind(this)} className="btn btn-danger"> Delete my CarProfile
            </button>
          </div>
        );
      } else {
        // User is logged in but has no car profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a car profile, please add some info</p>
            <Link to="/create-carprofile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteCarProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteCarProfile }
)(Dashboard);
