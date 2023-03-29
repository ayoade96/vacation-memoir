const mongoose = require('mongoose')
const FamilySchema = new mongoose.Schema({
name: {
     type: String,
        required: [true, 'Please provide family name'],
        minlength: 3,
        maxlength: 50,
},
image: {
     type: String,
    default: '/uploads/example.jpeg',
},
familyMemberPresent: {
    type: Number,
    required: [true, 'Please provide number of family member'],
    default: 0,
},
user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
},
},{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })


module.exports = mongoose.model('Family', FamilySchema);