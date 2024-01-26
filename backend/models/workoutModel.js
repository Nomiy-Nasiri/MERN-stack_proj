import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema
const workoutSchema = new Schema({
    title: {
        type: String,
        required: "Title is required"
    },
    reps: {
        type: Number,
        required: true

    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const workout = model("Workout", workoutSchema)
export default workout;