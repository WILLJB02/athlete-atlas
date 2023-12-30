import React, { useEffect, useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getCompetitionIdFromName, getCompetitionResultsByEvent } from '../../../api';
import { findCorrectRaceHeat, getEventIdFromEventNameAndGender } from '../../../utils/utils';
import './HeatResultsModel.css'

function HeatResultsModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [clickedCompetitionId, setClickedCompetitionId] = useState(null);
  const [clickedHeatResults, setClickedHeatResults] = useState(null);

  async function getHeatResults() {
    console.log(props.result.competition);
    setIsLoading(true);
    const competitionId = await getCompetitionIdFromName(props.result.competition, props.result.date);

    const parts = props.result.competition.split(' - ');
    const lastElement = parts[parts.length - 1];
    const ageGroup = lastElement.trim();

    console.log("Age Group: " + ageGroup);
    console.log(competitionId);
    if (competitionId !== null) {
      setClickedCompetitionId(competitionId);
      const eventId = getEventIdFromEventNameAndGender(props.result.discipline, props.gender, props.result.indoor);
      const eventResults = (await getCompetitionResultsByEvent(competitionId, eventId)) || {};
      const heatResults = findCorrectRaceHeat(eventResults, props.result.race, ageGroup);
      console.log(eventId)
      console.log(eventResults)
      console.log(heatResults)
      setClickedHeatResults(heatResults);
    } else {
      setClickedCompetitionId(null);
      setClickedHeatResults(null);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getHeatResults();
  }, []);

  return (
    <Modal open={props.isOpen} onClose={props.onClose}>
      <Box className="modalBox">
        {isLoading ? (
          <div className="loadingMessage">Loading...</div>
        ) : clickedHeatResults === null ? (
          <div className="noResultsMessage">No results available.</div>
        ) : (
          <div>
            <table className="resultsTable">
              <tbody>
                {clickedHeatResults.results.map((result, index) => (
                  <tr key={index}>
                    <td> {result.competitor.name} </td>
                    <td> {result.mark} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Button className="closeButton" onClick={props.onClose} variant="contained">
          Close
        </Button>
        <Link to={`/competition/${clickedCompetitionId}`}>
          <Button className="viewResultsButton" variant="contained" color="primary">
            View Results
          </Button>
        </Link>
      </Box>
    </Modal>
  );
}

export default HeatResultsModal;