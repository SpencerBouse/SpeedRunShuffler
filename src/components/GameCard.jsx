function GameCard({game}) {
  return (
    <>
      {game &&
        <div className='game-card'>
          <div className='cover-container'>
            <img 
              className='game-cover'
              alt='game cover art'
              title={game.names.international}
              src={game.assets['cover-medium'].uri} />
          </div>
          <div className='game-title-container'>
            <p className='game-title' title={game.names.international}>
              {game.names.international}
            </p>
          </div>
        </div>
      }
    </>
  )
}

export default GameCard