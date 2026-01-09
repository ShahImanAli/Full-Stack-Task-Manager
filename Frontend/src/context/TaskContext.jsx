import React, { useContext } from 'react'

export const TaskManagerContext = useContext(null)

function TaskManagerProvider({children}) {
  return (
    <TaskManagerContext.Provider value={{}}>
      {children}
    </TaskManagerContext.Provider>
  )
}

export default TaskManagerProvider

