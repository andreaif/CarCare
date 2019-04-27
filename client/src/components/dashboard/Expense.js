import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExpense } from '../../actions/carprofileActions';

class Expense extends Component {
  onDeleteClick(id) {
    this.props.deleteExpense(id);
  }

  render() {
    const expense = this.props.expense.map(expt => (
      <tr key={expt._id}>
        <td>{expt.typeofexpense}</td>
        <td>
          <Moment format="MM/DD/YYYY">{expt.edate}</Moment>
        </td>

        <td>{expt.description}</td>
        <td>{expt.totalamount}</td>

        <td>
          <button
            onClick={this.onDeleteClick.bind(this, expt._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Expense Records</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Type of Expense</th>
              <th>Date</th>
              <th>Description</th>
              <th>Total Amount</th>
              <th />
            </tr>
            {expense}
          </thead>
        </table>
      </div>
    );
  }
}

Expense.propTypes = {
  deleteExpense: PropTypes.func.isRequired
};

export default connect(null, { deleteExpense })(Expense);
