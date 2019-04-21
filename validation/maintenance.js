const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMaintenanceInput(data) {
  let errors = {};

  data.typeofmaintenance = !isEmpty(data.typeofmaintenance) ? data.typeofmaintenance : '';
  data.datecompleted = !isEmpty(data.datecompleted) ? data.datecompleted : '';


  if (Validator.isEmpty(data.typeofmaintenance)) {
    errors.typeofmaintenance = 'Type of maintenace is required';
  }
  if (Validator.isEmpty(data.datecompleted)) {
    errors.datecompleted = 'Date completed is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}