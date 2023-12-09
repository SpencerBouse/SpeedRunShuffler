import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { collectionAdded, selectAllCollections } from '../features/collections/collectionsSlice';

import Collection from './Collection';

function CollectionView(){
  const dispatch = useDispatch()
  const [formToggle,setFormToggle] = useState(false)
  const collections = useSelector(selectAllCollections)

  const createNewCollection=(evt)=>{
    evt.preventDefault()

    const name = evt.target.elements.name.value

    if(name) {
      const id = collections.length ? [...collections].sort((a,b)=>b.id-a.id)[0].id + 1 : 1
      const collection = { id: id, name: name, gameIds: [] }

      dispatch(collectionAdded(collection))
      setFormToggle(false)
    }
  }

  return(
    <div id='collections-container strecth-shadow'>
      <div className='collections-header'>
        <button 
          className='create-collection-btn' 
          title='Create New Collection Button' 
          onClick={()=> setFormToggle(true)}>
          Create New Collection
        </button>
        {formToggle &&
          <form className='collection-form stretch-shadow' onSubmit={(evt)=>createNewCollection(evt)}>
            <label>Collection Name: </label>
            <input 
              placeholder='Name'
              name='name'
              required={true}
              className='collection-name-input'> 
            </input>
            <br />
            <button className='light-gray' type='submit'>
              Ok
            </button>
            <button className='light-gray' onClick={()=> setFormToggle(false)}>
              Cancel
            </button>
          </form>
        }
      </div>

      &nbsp;

      {!!collections.length &&
        <>
          {[...collections].reverse().map((collection)=>
            <Collection 
              key={collection.id}
              collection={ collection } />
          )}
        </>
      }
      {!collections.length &&
        <p className='no-results'>No Collections.</p>
      }


      <p className='no-results'></p>
    </div>
  )
}

export default CollectionView