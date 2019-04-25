import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteMileage } from '../../actions/carprofileActions';

class Mileage extends Component {
  onDeleteClick(id) {
    this.props.deleteMileage(id);
  }

  render() {
    const mileage = this.props.mileage.map(mil => (
      <tr key={mil._id}>
        <td>
          <Moment format="MM/DD/YYYY">{mil.mdate}</Moment>
        </td>
        <td>{mil.purpose}</td>
        <td>{mil.odometerstart}</td>
        <td>{mil.odometerend}</td>
        <td>{mil.totalmileage}</td>
        <td>{mil.mcomments}</td>

        <td>
          <button
            onClick={this.onDeleteClick.bind(this, mil._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Mileage Records</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Purpose</th>
              <th>Odometer Start</th>
              <th>Odometer End</th>
              <th>Total Mileage</th>
              <th>Comments</th>
              <th />
            </tr>
            {mileage}
          </thead>
        </table>
      </div>
    );
  }
}

Mileage.propTypes = {
  deleteMileage: PropTypes.func.isRequired
};

export default connect(null, { deleteMileage })(Mileage);
