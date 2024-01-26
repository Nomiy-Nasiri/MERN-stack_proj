import React, { useEffect, useState } from "react"
// import workout from "../../../backend/models/workoutModel";


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
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchWorkouts();
    console.log(workouts)
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout, index)=>(
          <div className="workout" key={index}>
          <p>{workout._id}</p>
            
          </div>
        ))}

      </div>
      
    </div>
  )
}

export default Home
