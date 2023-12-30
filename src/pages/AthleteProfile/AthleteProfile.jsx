import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAthleteResults } from '../../api';
import AthleteProfileResultsTable from '../../components/common/AthleteProfileResultsTable/AthleteProfileResultsTable';

function AthleteProfile() {
  const { country, gender, id } = useParams();

  if (!id) {
    return <div>No Athlete ID provided.</div>;
  }

  const [resultsData, setResultsData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getResultsData();
  }, []);

  async function getResultsData() {
    setIsLoading(true);
    const results = (await getAthleteResults(id, null)) || {};
    setResultsData(results);
    setIsLoading(false);
  }

  return (
    <div>
      <div> AthleteProfile {id} {country} {gender}</div>
      {isLoading || resultsData === undefined ? (
        <div>Loading...</div>
      ) : (
        <AthleteProfileResultsTable resultsByDateResults={resultsData} country={country} gender={gender} />
      )}
    </div>
  );
}

export default AthleteProfile;