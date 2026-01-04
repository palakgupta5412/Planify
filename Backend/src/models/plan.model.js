import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const planSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: [ true, 'User ID is required' ],
    },
    name : {
        type: String,
        required: [ true, 'Plan name is required' ]
    },
    description : {
        type: String,
        required: false,
    },
    isDone : {
        type: Boolean,
        required:  [ true, 'Status of plan is required' ],
        default: false
    },
    category : {
        type: ["Food", "Experiences", "Travel", "Places", "Shopping"],
        required: [ true, 'Category is required' ],
    },
    createdAt : {
        type: String,
        required: [ true, 'Creation date is required' ],
    },
    completedAt : {
        type: String,
        required: false,
    },
    images : {
        type: [String],
        required: false,
    }
})

planSchema.index({ user: 1, name: 1 }, { unique: true });

export default mongoose.model('Plan', planSchema);