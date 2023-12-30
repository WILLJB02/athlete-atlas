import React, { useEffect, useState } from 'react';
import countries from 'i18n-iso-countries';
import { getAthletes } from '../../api';
import CountrySelect from '../../components/common/CountrySelect/CountrySelect';
import SearchAthletesResultTable from '../../components/common/SearchAthletesResultTable/SearchAthletesResultTable';

export default function SearchAthletes() {
  const [athleteData, setAthleteData] = useState();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  function searchInputHandler(event) {
    setSearchInput(event.target.value);
  }

  function handleSearch() {
    console.log(searchInput);
    getAthleteData();
  }

  function selectCountryHandler(value) {
    setSelectedCountry(countries.alpha2ToAlpha3(value));
  }

  useEffect(() => {
    getAthleteData();
  }, [selectedCountry]);

  async function getAthleteData() {
    setIsLoading(true);
    const athletes = await getAthletes(selectedCountry, searchInput);
    console.log(athletes)
    setAthleteData(athletes);
    setIsLoading(false);
  }

  return (
    <div>
      {selectedCountry}
      <CountrySelect selectedCountry={selectedCountry} onCountrySelect={selectCountryHandler} />
      <input type="text" value={searchInput} onChange={searchInputHandler} />
      <button onClick={handleSearch}>Search</button>
      {isLoading || athleteData === undefined ? (
        <div>Loading...</div>
      ) : (
        <SearchAthletesResultTable athleteSearchResult={athleteData}> </SearchAthletesResultTable>
      )}
    </div>
  );
}