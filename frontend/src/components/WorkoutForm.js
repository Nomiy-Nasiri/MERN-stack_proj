
import { useWorkoutsContext } from "../hooks/useContextWorkout";
import { useEffect, useState } from "react"

const WorkoutFrom = ({ editedWorkout }) => {
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)
    const [mode, setMode] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])


    // creating workout
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
                setEmptyFields(json.emptyFields);

            } else {

                setTitle("");
                setLoad("");
                setReps("");
                setError("");
                setEmptyFields([]);


                dispatch({ type: 'CREATE_WORKOUT', data: json })

                console.log("New workout is created with title:", json);
            }
        } catch (error) {
            setError("Error parsing response");
            console.error("Error parsing JSON:", error);
        }
    };
    
    // refilling form to update the workout
    useEffect(() => {
        if (editedWorkout) {
            setTitle(editedWorkout.title)
            setLoad(editedWorkout.load)
            setReps(editedWorkout.reps)
            setMode(true)

        }
    }, [editedWorkout])


    // updating workout
    const handleUpdate = async (e) => {
        e.preventDefault()
        const workout = {
            title,
            load,
            reps
        }
        const response = await fetch("/api/workouts/" + editedWorkout._id, {
            method: "PATCH",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json"
            }
        })
        try {
            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
                setEmptyFields(json.emptyFields);

            } else {

                setTitle("");
                setLoad("");
                setReps("");
                setError("");
                setEmptyFields([]);


                dispatch({ type: 'EDIT_WORKOUT', data: json })

                console.log("workout is updated");
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
                // className={emptyFields.includes('title') ? 'error' : ''}
                className={`emptyFields.indexOf('title') !== -1 ? 'error' : ''`}
            />

            <label>Load (kg)</label>
            <input
                type="number"
                onChange={(e) => { setLoad(e.target.value) }}
                value={load}
                // className={emptyFields.includes('load') ? 'error' : ''}
                className={`emptyFields.indexOf('load') !== -1 ? 'error' : ''`}

            />

            <label>Reps</label>
            <input
                type="number"
                onChange={(e) => { setReps(e.target.value) }}
                value={reps}
                // className={emptyFields.includes('reps') ? 'error' : ''}
                className={`emptyFields.indexOf('reps') !== -1 ? 'error' : ''`}

            />
            {mode && <button onClick={handleUpdate}>save a fitness Track</button>}
            {!mode && <button type="submit">Create a fitness Track</button>}
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default WorkoutFrom