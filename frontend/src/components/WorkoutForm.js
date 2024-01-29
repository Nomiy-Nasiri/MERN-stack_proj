import { useState } from "react"

const WorkoutFrom = () => {
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(title, load, reps)
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
        const json =  response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError(null)
            setTitle("")
            setLoad("")
            setReps("")
            console.log("new workout is created with title: ", title)
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create new WorkOut</h3>

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
            <button type="submit">Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default WorkoutFrom