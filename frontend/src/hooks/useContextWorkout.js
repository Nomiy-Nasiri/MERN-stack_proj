import { WorkoutsContext } from "../context/WorkoutsContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw new Error("useWorkoutsContext must be used within a WorkoutsContextProvider");
  }
  return context;
}
// import { WorkoutsContext } from "../context/WorkoutsContext"
// import { useContext } from "react"

// export const useWorkoutsContext = () => {
//   const context = useContext(WorkoutsContext)

//   if(!context) {
//     throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
//   }

//   return context
// }