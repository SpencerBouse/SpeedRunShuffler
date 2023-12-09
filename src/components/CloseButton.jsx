import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function CloseButton({title, className, disabled, action}){
  return(
    <>
      <button 
        className={ className }
        title={ title }
        disabled={ disabled }
        onClick={()=> action()} >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </>
  )
}

export default CloseButton