import { useEffect } from "react"
// import { useWorkoutsContext } from "../hooks/useContextWorkout"
import { useWorkoutsContext } from "../hooks/useContextWorkout";


import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutFrom from "../components/WorkoutForm";
const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();


  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts");
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          console.log(data)
          dispatch({ type: "SET_WORKOUTS", payload: data });
        }
        console.log(workouts)
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
          <WorkoutDetails key={index} workout={workout} />

        ))}

      </div>
      <WorkoutFrom />
    </div>
  )
}

export default Home
