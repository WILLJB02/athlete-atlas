import React, { useState } from 'react';
import HeatResultsModal from '../HeatResultsModel/HeatResultsModel';

const AthleteProfileResultsTable = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const handleCompetitionClick = async (result) => {
    console.log('here');
    setSelectedResult(result);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedResult(null);
    setModalOpen(false);
  };

  return (
    <div>
      <table>
        <tbody>
          {props.resultsByDateResults.data.getSingleCompetitorResultsDate.resultsByDate.map((result, index) => (
            <tr key={index}>
              <td> {result.date} </td>
              <td> {result.discipline} </td>
              <td onClick={() => handleCompetitionClick(result)}> {result.competition} </td>
              <td> {result.mark} </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedResult && (
        <HeatResultsModal gender={props.gender} isOpen={modalOpen} onClose={closeModal} result={selectedResult} />
      )}
    </div>
  );
};

export default AthleteProfileResultsTable;