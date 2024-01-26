import express from 'express';
import { CreatWorkout, DeleteWorkout, GetAllWorkouts, GetWorkoutById, UpdateWorkOut } from '../controller/workoutController.js'


const router = express.Router();

// get all workouts
router.get('/', GetAllWorkouts);
// getwworkout by id
router.get('/:id', GetWorkoutById);
// create workout
router.post('/', CreatWorkout);
// delete Workout
router.delete('/:id', DeleteWorkout);

router.patch('/:id', UpdateWorkOut);
export default router