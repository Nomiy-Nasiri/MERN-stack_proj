import { useEffect, useState } from "react"
// import workout from "../../../backend/models/workoutModel";

import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutFrom from "../components/WorkoutForm";
const Home = () => {
  const [workouts, setWorkouts] = useState(null)


  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts");
        const data = await response.json();
        if (response.ok) {
          setWorkouts(data);
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
