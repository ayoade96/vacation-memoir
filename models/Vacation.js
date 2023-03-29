const mongoose = require('mongoose')
const VacationSchema = new mongoose.Schema({
name: {
     type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
},
image: {
     type: String,
    default: '/uploads/example.jpeg',
},
peoplePresent: {
    type: Number,
    required: [true, 'Please provide number of people'],
    default: 0,
},
user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
},
},{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })


module.exports = mongoose.model('Vacation', VacationSchema);