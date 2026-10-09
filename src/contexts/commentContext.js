import React, { createContext,  useState } from 'react'
export const CommentContext = createContext()
const CommentProvider=({children}) => {
  const [comment,setComment] = useState([])
  return (
    <CommentContext.Provider value={{comment,setComment}}>
      {children}
    </CommentContext.Provider>
  )
}

export default CommentProvider
