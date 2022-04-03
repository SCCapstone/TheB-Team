'use strict';

import axios from 'axios'

const geoStr = 'geo!';

const sortVariables = (variables) => {
    variables.sort((a, b) => (a.name > b.name) ? 1 : -1);
    return variables
}

const getRoute = async (lat1,lng1,lat2,lng2) => {
    var response = await axios.get("https://route.ls.hereapi.com/routing/7.2/calculateroute.json", {
        params: {
            apiKey:"x3u91OpwIPzEJL_v89yy8xy7V1tZxjdB83oA7b3PL70",
            waypoint0:`${geoStr}${lat1},${lng1}`,
            waypoint1:`${geoStr}${lat2},${lng2}`, 
            routeattributes:"wp,sm,sh,sc",
            mode:"fastest;truck",
            metricSystem: "imperial"
        }
    });
    return response;
}

const getCoord = async (street, city, state) => {
    var response = await axios.get("https://geocoder.ls.hereapi.com/6.2/geocode.json", {
        params: {
            apiKey:"x3u91OpwIPzEJL_v89yy8xy7V1tZxjdB83oA7b3PL70",
            searchtext:`${street},${city},${state}`
        }
    });
    return response;
}

const states = [
    {
        key: 'AL',
        text: 'Alabama',
        base: 6,
        broker: 0
    },
    {
        key: 'SC',
        text: 'South Carolina',
        base: 0,
        broker: 15
    },
    {
        key: 'NC',
        text: 'North Carolina',
        base: 12,
        broker: 15
    },
    {
        key: 'GA',
        text: 'Georgia',
        base: 8,
        broker: 15
    }
];

export {
    sortVariables,
    getRoute,
    getCoord,
    states
}