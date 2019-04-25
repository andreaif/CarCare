import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteMaintenance } from '../../actions/carprofileActions';

class Maintenance extends Component {
  onDeleteClick(id) {
    this.props.deleteMaintenance(id);
  }

  render() {
    const maintenance = this.props.maintenance.map(mant => (
      <tr key={mant._id}>
        <td>{mant.typeofmaintenance}</td>
        <td>
          <Moment format="MM/DD/YYYY">{mant.datecompleted}</Moment>
        </td>
        <td>
          <Moment format="MM/DD/YYYY">{mant.nextservicedue}</Moment>

        </td>
        <td>{mant.comments}</td>

        <td>
          <button
            onClick={this.onDeleteClick.bind(this, mant._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Maintenance Records</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Type of Maintenance</th>
              <th>Date Completed</th>
              <th>Next Service Due</th>
              <th>Comments</th>
              <th />
            </tr>
            {maintenance}
          </thead>
        </table>
      </div>
    );
  }
}

Maintenance.propTypes = {
  deleteMaintenance: PropTypes.func.isRequired
};

export default connect(null, { deleteMaintenance })(Maintenance);
