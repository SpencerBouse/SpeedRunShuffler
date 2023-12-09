import { useRef, useEffect } from "react"

function useOutsideAlert(ref, action){
  useEffect(()=>{
    function handleClickOut(evt){
      if(ref.current && !ref.current.contains(evt.target)){
        action()
      }
    }
    
    document.addEventListener('mousedown', handleClickOut)
    return()=>{
      document.removeEventListener('mousedown', handleClickOut)
    }
  },[ref])
}

function OutsideAlert({action, children}){
  const wrapperRef = useRef(null)
  useOutsideAlert(wrapperRef, action)

  return(
    <div ref={wrapperRef}>
      {children}
    </div>
  )
}

export default OutsideAlert