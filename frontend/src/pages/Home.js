import { useEffect, useState } from "react"
// import { useWorkoutsContext } from "../hooks/useContextWorkout"
import { useWorkoutsContext } from "../hooks/useContextWorkout";


import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutFrom from "../components/WorkoutForm";
const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const [editedWorkout,setEditedWorkout]=useState()


  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts");
        const data = await response.json();
        if (response.ok) {         
          dispatch({ type: "SET_WORKOUTS", data });
        }
        // why here null
        // console.log(workouts)
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout, index) => (
          <WorkoutDetails key={index} workout={workout} setEditedWorkout={setEditedWorkout}/>

        ))}

      </div>
      <WorkoutFrom  workouts={workouts}  editedWorkout={editedWorkout}/>
    </div>
  )
}

export default Home
