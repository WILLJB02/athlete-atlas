import React from 'react';

const SearchAthletesResultTable = (props) => {
  console.log(props);
  return (
    <div>
      <table>
        <tbody>
          {props.athleteSearchResult.data.searchCompetitors.map((athlete) => (
            <tr key={athlete.aaAthleteId}>
              <td>
                {' '}
                <img src={`https://media.aws.iaaf.org/athletes/${athlete.aaAthleteId}.jpg`} alt="Athlete" />{' '}
              </td>
              <td>
                {' '}
                <a href={`/athlete/${athlete.country}/${athlete.gender}/${athlete.aaAthleteId}`}>
                  {' '}
                  {athlete.givenName.concat(' ', athlete.familyName)}{' '}
                </a>{' '}
              </td>
              <td> {athlete.disciplines} </td>
              <td> {athlete.country} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchAthletesResultTable;