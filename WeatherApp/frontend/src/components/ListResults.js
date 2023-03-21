import React from 'react'
import Item from './Item'

const ListResults = ({results}) => {
    
  return (
    <div style={{alignItems:"center"}}>
      {results?<>
      <p>Out Top 5 Matching queries</p>
      {results.map((result)=>(
        <Item key={result.lat} item={result}/>
      ))}
      </>:<p>No matching results</p>}
    </div>
  )
}

export default ListResults
