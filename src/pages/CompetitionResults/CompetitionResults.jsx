import React from 'react'
import { useParams } from 'react-router-dom';

const CompetitionResults = () => { 
  const {id} = useParams();
  return (
    <div>CompetitionResults {id} </div>
  )
}

export default CompetitionResults