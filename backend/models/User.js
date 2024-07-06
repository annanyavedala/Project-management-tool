const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: ['Project Manager', 'Team Member', 'Stakeholder', 'Administrator', 'Task Owner'],
        default: 'Team Member'
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    
});

module.exports= mongoose.model('User', userSchema);

