import GameShelfItem from "./GameShelfItem"
import PseduoGameCard from "./PseudoGameCard"

function GameShelf({games, collectionId, onRemove}){
  if(games.length){
    return(
      <div className='game-shelf'>
        {
          games.map((game,index)=>{
            if(game){
              return(
                <GameShelfItem 
                  key={game.id}
                  game={game}
                  collectionId={collectionId}
                  onRemove={onRemove}/>
              )
            }else{
              return( <PseduoGameCard key={index}/> )
            }
          })
        }
      </div>
    )
  }else{
    return(
      <div className="game-shelf p-2 no-results">
        Collection Empty. Add Games via Search
      </div>
    )
  }
}

export default GameShelf