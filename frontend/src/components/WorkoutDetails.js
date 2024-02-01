
import { useWorkoutsContext } from "../hooks/useContextWorkout";


const WorkoutDetails = ({ workout,setEditedWorkout }) => {
  const { dispatch } = useWorkoutsContext();

  // delete workout
  const handleDelete = async () => {

    const response = await fetch("/api/workouts/"+ workout._id,
      {
        method: "DELETE",
      }
    )
    const json = await response.json();
    console.log(json)
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", data: {id: workout._id} });
      console.log("deleted the workout")
    }

    if (!response.ok) {
      throw new Error("Something went wrong!")
    }

  }
  const handleEdit =() => {
    setEditedWorkout(workout)
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg):</strong>{workout.load}</p>
      <p><strong>Reps:</strong>{workout.reps}</p>
      <p> {workout.createdAt}</p>
      <span onClick={handleDelete}>Delete Track</span>
      <button onClick={handleEdit}>Edit Track</button>

    </div>
  )
}

export default WorkoutDetails
