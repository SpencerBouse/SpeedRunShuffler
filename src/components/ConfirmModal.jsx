function ConfirmModal({title, onOkay, onCancel}){
  return(
    <div className='modal-content'>
      <p>{title}</p>
      <div>
        <button 
          className='mr-sm'
          onClick={()=>onOkay()}>
          OK
        </button>
        <button 
          className='ml-sm'
          onClick={()=>onCancel()}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ConfirmModal