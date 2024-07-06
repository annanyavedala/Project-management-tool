const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',  // Refers to the Project model
        required: true
    },
    assignedTo: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],  // Example of status options
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', taskSchema);
