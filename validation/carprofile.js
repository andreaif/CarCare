const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCarProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.carname = !isEmpty(data.carname) ? data.carname : '';
  data.caryear = !isEmpty(data.caryear) ? data.caryear : '';
  data.carmake = !isEmpty(data.carmake) ? data.carmake : '';
  data.carmodel = !isEmpty(data.carmodel) ? data.carmodel : '';
  data.cartrim = !isEmpty(data.cartrim) ? data.cartrim : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 4 characters';
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Car Profile handle is required';
  }
  if (Validator.isEmpty(data.carname)) {
    errors.carname = 'Car name field is required';
  }
  if (Validator.isEmpty(data.caryear)) {
    errors.caryear = 'Car year field is required';
  }
  if (Validator.isEmpty(data.carmake)) {
    errors.carmake = 'Car make field is required';
  }
  if (Validator.isEmpty(data.carmodel)) {
    errors.carmodel = 'Car model field is required';
  }
  if (Validator.isEmpty(data.cartrim)) {
    errors.cartrim = 'Car trim field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};