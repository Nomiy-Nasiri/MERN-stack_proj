import { useWorkoutsContext } from "../hooks/useContextWorkout";
import { useState } from "react"

const WorkoutFrom = () => {
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = {
            title,
            load,
            reps
        }
        const response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json"
            }
        })
        try {
            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                setError("");
                setTitle("");
                setLoad("");
                setReps("");
                dispatch({ type: 'CREATE_WORKOUT', data: json })

                console.log("New workout is created with title:", json);
            }
        } catch (error) {
            setError("Error parsing response");
            console.error("Error parsing JSON:", error);
        }
    };
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Keep tracking the Fitness!</h3>

            <label>Excersize name</label>
            <input
                type="text"
                onChange={(e) => { setTitle(e.target.value) }}
                value={title}
            />

            <label>Load (kg)</label>
            <input
                type="number"
                onChange={(e) => { setLoad(e.target.value) }}
                value={load}
            />

            <label>Reps</label>
            <input
                type="number"
                onChange={(e) => { setReps(e.target.value) }}
                value={reps}
            />
            <button type="submit">Create a fitness Track</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default WorkoutFrom