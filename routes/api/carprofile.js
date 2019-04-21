const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Validation
const validateCarProfileInput = require('../../validation/carprofile');
const validateMaintenanceInput = require('../../validation/maintenance');
const validateMileageInput = require('../../validation/mileage');

// Load carprofile Model
const CarProfile = require('../../models/CarProfile');
// Load User Model
const User = require('../../models/User');

// @route   GET api/CarProfile/test
// @desc    Tests CarProfile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'CarProfile Works' }));

// @route   GET api/CarProfile
// @desc    Get current users CarProfile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    CarProfile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(carprofile => {
        if (!carprofile) {
          errors.nocarprofile = 'There is no carprofile for this user';
          return res.status(404).json(errors);
        }
        res.json(carprofile);
      })
      .catch(err => res.status(404).json(err));
  });
// @route   GET api/profile/profile/all
// @desc    Get all profiles
// @access  Private
// none


// @route   GET api/profile/handle/:handle
// @desc    Get carprofile by handle
// @access  Private
router.get('/handle/:handle', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    CarProfile.findOne({ handle: req.params.handle })
      .populate('user', ['name', 'avatar'])
      .then(carprofile => {
        if (!carprofile) {
          errors.nocarprofile = 'There is no car profile for this user';
          res.status(404).json(errors);
        }
        res.json(carprofile);
      })
      .catch(err => res.status(404).json(err));
  });
// @route   GET api/profile/user/:user_id
// @desc    Get carprofile by user ID
// @access  Private
router.get('/user/:user_id', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    CarProfile.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar'])
      .then(carprofile => {
        if (!carprofile) {
          errors.nocarprofile = 'There is no car profile for this user';
          res.status(404).json(errors);
        }
        res.json(carprofile);
      })
      .catch(err => res.status(404).json({ carprofile: 'There is no car profile for this user' }));
  });

// @route   POST api/CarProfile
// @desc    Create or edit User Profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCarProfileInput(req.body);

    //Check Validation
    if (!isValid) {
      //Return any errors with 400 status 
      return res.status(400).json(errors);
    }

    //Get fields
    const CarProfileFields = {};
    CarProfileFields.user = req.user.id;
    if (req.body.handle) CarProfileFields.handle = req.body.handle;
    if (req.body.carname) CarProfileFields.carname = req.body.carname;
    if (req.body.caryear) CarProfileFields.caryear = req.body.caryear;
    if (req.body.carmake) CarProfileFields.carmake = req.body.carmake;
    if (req.body.carmodel) CarProfileFields.carmodel = req.body.carmodel;
    if (req.body.cartrim) CarProfileFields.cartrim = req.body.cartrim;

    CarProfile.findOne({ user: req.user.id })
      .then(carprofile => {
        if (carprofile) {
          //Update
          CarProfile.findOneAndUpdate({ user: req.user.id }, { $set: CarProfileFields }, { new: true })
            .then(carprofile => res.json(carprofile));
        } else {
          //Create

          //Check if handle exists
          CarProfile.findOne({ handle: CarProfileFields.handle }).then(carprofile => {
            if (carprofile) {
              errors.hanle = 'That handle already exists';
              res.status(400).json(errors);
            }
            //Save CarProfile
            new CarProfile(CarProfileFields).save().then(carprofile => res.json(carprofile));
          });
        }
      });
  }
);

// @route   POST api/CarProfile/addmaintenance
// @desc    Add maintenance
// @access  Private
router.post('/maintenance', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validateMaintenanceInput(req.body);

  //Check Validation
  if (!isValid) {
    //Return any errors with 400 status 
    return res.status(400).json(errors);
  }

  CarProfile.findOne({ user: req.user.id })
    .then(carprofile => {
      const newMaintenance = {
        typeofmaintenance: req.body.typeofmaintenance,
        datecompleted: req.body.datecompleted,
        nextservicedue: req.body.nextservicedue,
        comments: req.body.comments,
      }

      //Add to manintenance array
      carprofile.maintenance.unshift(newMaintenance);

      carprofile.save().then(carprofile => res.json(carprofile));
    });
});

// @route   DELETE api/CarProfile/maintenance/:mnt_id
// @desc    Delete maintenance from carprofile
// @access  Private
router.delete('/maintenance/:mnt_id', passport.authenticate('jwt', { session: false }), (req, res) => {

  CarProfile.findOne({ user: req.user.id })
    .then(carprofile => {
      //Get remove index
      const removeIndex = carprofile.maintenance
        .map(item => item.id)
        .indexOf(req.param.mnt_id);

      //Splice out of array
      carprofile.maintenance.splice(removeIndex, 1);

      //Save
      carprofile.save().then(carprofile => res.json(carprofile));
    })
    .catch(err => res.status(404).json(err));
}
);

// @route   POST api/CarProfile/addmileage
// @desc    Add mileage
// @access  Private
router.post('/mileage', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validateMileageInput(req.body);

  //Check Validation
  if (!isValid) {
    //Return any errors with 400 status 
    return res.status(400).json(errors);
  }

  CarProfile.findOne({ user: req.user.id })
    .then(carprofile => {
      const newMileage = {
        mdate: req.body.mdate,
        purpose: req.body.purpose,
        odometerstart: req.body.odometerstart,
        odometerend: req.body.odometerend,
        totalmileage: req.body.totalmileage,
        mcomments: req.body.mcomments,
      }

      //Add to manintenance array
      carprofile.mileage.unshift(newMileage);

      carprofile.save().then(carprofile => res.json(carprofile));
    })
});

// @route   DELETE api/CarProfile/mileage/:mil_id
// @desc    Delete mileage from carprofile
// @access  Private
router.delete('/mileage/:mil_id', passport.authenticate('jwt', { session: false }), (req, res) => {

  CarProfile.findOne({ user: req.user.id })
    .then(carprofile => {
      //Get remove index
      const removeIndex = carprofile.mileage
        .map(item => item.id)
        .indexOf(req.param.mil_id);

      //Splice out of array
      carprofile.mileage.splice(removeIndex, 1);

      //Save
      carprofile.save().then(carprofile => res.json(carprofile));
    })
    .catch(err => res.status(404).json(err));
}
);

// @route   DELETE api/CarProfile
// @desc    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  CarProfile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => res.json({ success: true })
      );
    });
}
);




module.exports = router;

