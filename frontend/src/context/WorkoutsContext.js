

import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, { data, type }) => {
  switch (type) {
    case 'SET_WORKOUTS':
      return {
        workouts: data
      }
    case 'CREATE_WORKOUT':
      return {
        workouts: [data, ...state.workouts]
      }
    case 'DELETE_WORKOUT':
      console.log(data);
      return {
        workouts: state.workouts.filter((workout) => workout._id !== data.id),
        // workouts: [data, ...state.workouts]
      }
    case 'EDIT_WORKOUT':
      console.log(data._id);
      return {
       workouts: state.workouts.map((workout) => {
          if (workout._id === data._id) {
            return data
          }
          return workout
        })
      }
    default:
      return state
  }
}

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null
  })
  console.log(state.workouts)

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  )
}
