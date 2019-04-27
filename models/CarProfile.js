const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CarProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  //if array user type:[String] for api on car info
  carname: {
    type: String,
    required: true
  },
  caryear: {
    type: String,
    required: true
  },
  carmake: {
    type: String,
    required: true
  },
  carmodel: {
    type: String,
    required: true
  },
  cartrim: {
    type: String,
    required: true
  },
  maintenance: [
    {
      typeofmaintenance: {
        type: [String],
        required: true
      },
      datecompleted: {
        type: Date,
        required: true
      },
      nextservicedue: {
        type: Date,
      },
      comments: {
        type: String,
      }
    }
  ],
  mileage: [
    {
      mdate: {
        type: Date,
        required: true
      },
      purpose: {
        type: [String],
        required: true
      },
      odometerstart: {
        type: Number,
        required: true
      },
      odometerend: {
        type: Number,
        required: true
      },
      totalmileage: {
        type: Number,
      },
      mcomments: {
        type: String,
      },
    }
  ],
  expense: [
    {
      typeofexpense: {
        type: [String],
        required: true
      },
      edate: {
        type: Date,
        required: true
      },
      description: {
        type: String,
      },
      totalamount: {
        type: Number,
      }
    }
  ],
  Date: {
    type: Date,
    default: Date.now
  }
});

module.exports = CarProfile = mongoose.model('carprofile', CarProfileSchema);