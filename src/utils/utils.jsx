import { eventIds } from "../constants";

export function getEventIdFromEventNameAndGender(eventName, gender, indoor) {
    let event = gender + "'s" + " " + eventName;
    event = event.replace(/ Metres$/, 'm');
    event = event.replace(/ One\b/g, '');

    if (indoor) {
        event += " indoor";
    }

    if (event.includes('Road')) {
        event += " Race";
    }

    console.log(event);

    return eventIds[event];
}

export function findCorrectRaceHeat(eventResults, race, ageGroup) {
    let raceNumber = convertToRaceTypeAndNumber(race);
    console.log(eventResults);
    console.log(race);
    console.log(raceNumber);

    if (raceNumber !== null) {
        let races = eventResults.data.getCalendarCompetitionResults.eventTitles[0].events[0].races;
        console.log(races);
        for (let i = 0; i < races.length; i++) {
            if (races[i].race === raceNumber[0] && races[i].raceNumber === raceNumber[1]) {
                return races[i];
            }
        }
    }

    return null;
}

function convertToRaceTypeAndNumber(input) {
    const raceTypeMap = {
        H: "Round 1",
        R: "Round",
        SF: "Semifinal",
        F: "Final",
        Q: "Qualification"
    };

    const match = input.match(/(H|R|SF|F|Q)(\d*)/);

    if (match) {
        const raceType = raceTypeMap[match[1]];
        const number = match[2] ? parseInt(match[2]) : 0;

        return [raceType, number];
    }

    return null;
}