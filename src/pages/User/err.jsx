import React from 'react'

const Err = (props) => {
    const {err} = props
    function renderErr(){
        if(Object.keys(err).length>0){
            return(Object.keys(err).map((key)=>{
                return <li key={key}>{err[key]}</li>
            }))
        }
    }
  return (
    <>
      {renderErr()}
    </>
  )
}

export default Err
