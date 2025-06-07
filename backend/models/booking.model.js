import mongoose from 'mongoose'


const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
  },
  dateTime: {
    type: Date,
    required: [true, 'Date and time are required'],
    validate: {
      validator: function (value) {
        return value > new Date();
      },
      message: 'Date and time must be in the future',
    },
  },
  trip: {
    type: String,
    required: [true, 'Trip selection is required'],
    trim: true,
  },
   specialReq: {
    type: String,
    required: [false, 'it is Optional'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;