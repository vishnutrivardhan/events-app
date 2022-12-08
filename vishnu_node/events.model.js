const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        date: {
            type: String,
            required: true
        },
        start_time: {
            type: String,
            required: true
        },
        end_time: {
            type: String,
            required: true
        },
        venue: {
            type: String,
            required: true
        },
        availability: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
);



const event_model = mongoose.model('event', eventSchema);
// export default event_model;
module.exports = event_model;
