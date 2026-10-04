import React from 'react'

const Err = (props) => {
    const {err} = props
    function renderErr(){
        if(Object.keys(err).length>0){
            return(Object.keys(err).map((key)=>{
                return <p style={{ color: "red" }} key={key}>{err[key]}</p>
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
