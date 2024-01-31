import { useWorkoutsContext } from "../hooks/useContextWorkout";


const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();


// its not sync with db
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
      console.log("deleted the workout:")
    }

    if (!response.ok) {
      throw new Error("Something went wrong!")
    }

  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg):</strong>{workout.load}</p>
      <p><strong>Reps:</strong>{workout.reps}</p>
      <p> {workout.createdAt}</p>
      <span onClick={handleDelete}>Delete Track</span>

    </div>
  )
}

export default WorkoutDetails
