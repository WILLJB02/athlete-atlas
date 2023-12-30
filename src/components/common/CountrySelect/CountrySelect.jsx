import React from 'react';
import { Select, MenuItem } from '@mui/material';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);
const countryObj = countries.getNames('en', { select: 'official' });
const countryArr = Object.entries(countryObj).map(([key, value]) => ({
  label: value,
  value: key,
}));

const CountrySelect = ({ selectedCountry, onCountrySelect }) => {
  return (
    <Select value={selectedCountry} onChange={(e) => onCountrySelect(e.target.value)}>
      {countryArr?.length &&
        countryArr.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
    </Select>
  );
};

export default CountrySelect;