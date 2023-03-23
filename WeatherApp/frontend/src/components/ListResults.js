import React from 'react'
import Item from './Item'

const ListResults = ({results,entry,setEntry}) => {
    
  return (
    <div style={{alignItems:"center"}}>
      {results?<>
      <p>Our Top 5 Matching queries</p>
      {results.map((result,index)=>(
        <Item key={index} item={result} entry={entry} setEntry={setEntry}/>
      ))}
      </>:<p>No matching results</p>}
    </div>
  )
}

export default ListResults
