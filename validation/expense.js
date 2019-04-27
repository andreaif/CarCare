const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExpenseInput(data) {
  let errors = {};

  data.typeofexpense = !isEmpty(data.typeofexpense) ? data.typeofexpense : '';
  data.edate = !isEmpty(data.edate) ? data.edate : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.totalamount = !isEmpty(data.totalamount) ? data.totalamount : '';

  if (Validator.isEmpty(data.typeofexpense)) {
    errors.typeofexpense = 'Type of expense is required';
  }
  if (Validator.isEmpty(data.edate)) {
    errors.edate = 'Date is required';
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description is required';
  }
  if (Validator.isEmpty(data.totalamount)) {
    errors.totalamount = 'Total amount is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}