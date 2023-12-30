import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AthleteProfile from '../pages/AthleteProfile/AthleteProfile';
import Home from '../pages/Home/Home';
import CompetitionResults from '../pages/CompetitionResults/CompetitionResults';
import SearchAthletes from '../pages/SearchAthletes/SearchAthletes';


/** All routes */
export const routes = [
  {
    path: '/athlete/:country/:gender/:id',
    name: 'Athlete',
    exact: true,
    Component: AthleteProfile,
    secured: false
  },
  {
    path: '/',
    name: 'Home',
    exact: true,
    Component: Home,
    secured: true
  },
  {
    path: '/athletes',
    name: 'Athletes',
    exact: true,
    Component: SearchAthletes,
    secured: true
  },
  {
    path: '/competition/:id',
    name: 'Competition',
    exact: true,
    Component: CompetitionResults,
    secured: true
  }
];

/**
 * Map over and render routes + handle navigation.
 */
const Routing = () => {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={<Component />}
        />
      ))}
    </Routes>
  );
};

export default Routing;