import axios from "axios";
import { apiConfig, serverURL } from "../constants";

export async function getAthletes(country, query) {

    console.log(country)
    console.log(query)

    let result = {};

    let data = {
        "operationName": "SearchCompetitors",
        "variables": {
          "countryCode": country,
          "query": query
        },
        "query": "query SearchCompetitors($query: String, $gender: GenderType, $disciplineCode: String, $environment: String, $countryCode: String) {\n  searchCompetitors(query: $query, gender: $gender, disciplineCode: $disciplineCode, environment: $environment, countryCode: $countryCode) {\n    aaAthleteId\n    familyName\n    givenName\n    birthDate\n    disciplines\n    iaafId\n    gender\n    country\n    urlSlug\n    __typename\n  }\n}\n"
    }

    await axios.post(serverURL, data, apiConfig)
    .then((res) => {
        result = res.data;
    })
    .catch((err) => {
        console.log(err);
    })

    console.log("Here");
    console.log(result);
    return result;
}

export async function getAthleteResults(id, year) {

    let result = {};

    let data = {
        "operationName": "GetSingleCompetitorResultsDate",
        "variables": {
            "resultsByYearOrderBy":"date",
            "id": id,
            "resultsByYear": year
        },
        "query": "query GetSingleCompetitorResultsDate($id: Int, $resultsByYearOrderBy: String, $resultsByYear: Int) {\n  getSingleCompetitorResultsDate(id: $id, resultsByYear: $resultsByYear, resultsByYearOrderBy: $resultsByYearOrderBy) {\n    parameters {\n      resultsByYear\n      resultsByYearOrderBy\n      __typename\n    }\n    activeYears\n    resultsByDate {\n      date\n      competition\n      venue\n      indoor\n      disciplineCode\n      disciplineNameUrlSlug\n      typeNameUrlSlug\n      discipline\n      country\n      category\n      race\n      place\n      mark\n      wind\n      notLegal\n      resultScore\n      remark\n      __typename\n    }\n    __typename\n  }\n}\n"
    }

    await axios.post(serverURL, data, apiConfig)
    .then((res) => {
        result = res.data;
    })
    .catch((err) => {
        console.log(err);
    })

    return result;
}

export async function getCompetitionIdFromName(competition, date) {

    const year = date.substring(date.length - 4);

    let competitionId = null;

    let data = {
        operationName: "getCalendarEvents",
        variables: {
            startDate: year + "-01-01",
            endDate: year + "-12-31",
            query: competition,
            regionType: "world",
            regionId: null,
            disciplineId: null,
            rankingCategoryId: null,
            permitLevelId: null,
            competitionGroupId: null,
            competitionSubgroupId: null,
            limit: 3,
            offset: 0,
            showOptionsWithNoHits: false,
            hideCompetitionsWithNoResults: true,
            orderDirection: "Ascending"
        },
        query: "query getCalendarEvents($startDate: String, $endDate: String, $query: String, $regionType: String, $regionId: Int, $currentSeason: Boolean, $disciplineId: Int, $rankingCategoryId: Int, $permitLevelId: Int, $competitionGroupId: Int, $competitionSubgroupId: Int, $competitionGroupSlug: String, $limit: Int, $offset: Int, $showOptionsWithNoHits: Boolean, $hideCompetitionsWithNoResults: Boolean, $orderDirection: OrderDirectionEnum) {\n  getCalendarEvents(startDate: $startDate, endDate: $endDate, query: $query, regionType: $regionType, regionId: $regionId, currentSeason: $currentSeason, disciplineId: $disciplineId, rankingCategoryId: $rankingCategoryId, permitLevelId: $permitLevelId, competitionGroupId: $competitionGroupId, competitionSubgroupId: $competitionSubgroupId, competitionGroupSlug: $competitionGroupSlug, limit: $limit, offset: $offset, showOptionsWithNoHits: $showOptionsWithNoHits, hideCompetitionsWithNoResults: $hideCompetitionsWithNoResults, orderDirection: $orderDirection) {\n    results {\n      id    \n      name    }\n    __typename\n  }\n}\n"
    }

    await axios.post(serverURL, data, apiConfig)
    .then((res) => {
        let result = res.data;
        console.log(res.data);

        const competitions = result.data.getCalendarEvents.results;
        const competitionName = competition.split(',')[0];
        
        for (let i = 0; i < competitions.length; i++) {
          if (competitions[i].name.startsWith(competitionName)) {
            console.log(competitionName);
            console.log(competitions[i].name);
            competitionId = competitions[i].id;
            break;
          }
        }
    })
    .catch((err) => {
        console.log(err);
    })

    return competitionId;
}

export async function getCompetitionResultsByEvent(competitionId, eventId) {

    let result = {};

    let data = {
        operationName: "getCalendarCompetitionResults",
        variables: {
          competitionId: competitionId,
          day: null,
          eventId: eventId
        },
        "query": "query getCalendarCompetitionResults($competitionId: Int, $day: Int, $eventId: Int) {\n  getCalendarCompetitionResults(competitionId: $competitionId, day: $day, eventId: $eventId) {\n    competition {\n      dateRange\n      endDate\n      name\n      rankingCategory\n      startDate\n      venue\n      __typename\n    }\n      eventTitles {\n      rankingCategory\n      eventTitle\n      events {\n      event\n      eventId\n      gender\n      isRelay\n      perResultWind\n      withWind\n      races {\n      date\n      day\n      race\n      raceId\n      raceNumber\n      wind\n      results {\n      competitor {\n      teamMembers {    name\n    urlSlug\n    id\n    iaafId\n    __typename\n  }\n      id\n      name\n      iaafId\n      urlSlug\n      birthDate\n      hasProfile\n      __typename\n    }\n      mark\n      nationality\n      place\n      points\n      qualified\n      records\n      wind\n      remark\n      __typename\n    }\n      __typename\n    }\n      __typename\n    }\n      __typename\n    }\n    __typename\n  }\n}\n"
      }

    await axios.post(serverURL, data, apiConfig)
    .then((res) => {
        result = res.data;
    })
    .catch((err) => {
        console.log(err);
    })

    return result;
}

export async function getAthleteMedia(urlSlug) {

    let result = {};

    let data = {
        operationName: "getSingleCompetitor",
        variables: {
            urlSlug: urlSlug
        },
        "query": "query getSingleCompetitor($urlSlug: String) {\n  getSingleCompetitor(urlSlug: $urlSlug) {\n    primaryMedia{\n      fileName\n      __typename\n     }\n      __typename\n  }\n}\n"
      }

    await axios.post(serverURL, data, apiConfig)
    .then((res) => {
        result = res.data;
    })
    .catch((err) => {
        console.log(err);
    })

    return result;
}