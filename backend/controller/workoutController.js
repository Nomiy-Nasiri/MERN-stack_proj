import mongoose from 'mongoose';
import Workout from '../models/workoutModel.js';
// import mongoose from 'mongoose'

// get all workouts
export const GetAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find().sort({ createdAt: -1 });
        return res.status(200).json(workouts);
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}
// get wworkout by id
export const GetWorkoutById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: "Workout not found"
        });
    }

    const workout = await Workout.findById(id);
    if (!workout) {
        return res.status(404).json({
            message: "Workout not found"
        });
    }
    res.status(200).json(workout);
}


// create new workout 
export const CreatWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    let emptyFields = [];

    if(!title) {
        emptyFields.push('title')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({
            error: "please provide " + emptyFields.join(',')
        })
    }

    // add doc to db
    try {
        const workout = await Workout.create({ title, reps, load });
        return res.status(200).json(workout);
    }
    catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
}

// update workout
export const UpdateWorkOut = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: "Workout not found"
        });
    }
    const workout = await Workout.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })
    res.status(200).json(workout)
}
// delete workout
export const DeleteWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: "Workout not found"
        });
    }

    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
        return res.status(404).json({
            message: "Workout not found"
        });
    }
    res.status(200).json({ "message": "Deleted" });
}