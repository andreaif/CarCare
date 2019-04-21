const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMileageInput(data) {
  let errors = {};

  data.mdate = !isEmpty(data.mdate) ? data.mdate : '';
  data.purpose = !isEmpty(data.purpose) ? data.purpose : '';
  data.odometerstart = !isEmpty(data.odometerstart) ? data.odometerstart : '';
  data.odometerend = !isEmpty(data.odometerend) ? data.odometerend : '';

  if (Validator.isEmpty(data.mdate)) {
    errors.mdate = 'Date is required';
  }
  if (Validator.isEmpty(data.purpose)) {
    errors.purpose = 'Purpose is required';
  }
  if (Validator.isEmpty(data.odometerstart)) {
    errors.odometerstart = 'Start odometer mileage is required';
  }
  if (Validator.isEmpty(data.odometerend)) {
    errors.odometerend = 'End odometer mileage is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}