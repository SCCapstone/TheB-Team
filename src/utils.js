'use strict';

import axios from 'axios'

const geoStr = 'geo!';

function sortVariables(variables) {
    variables.sort((a, b) => (a.name > b.name) ? 1 : -1);
    return variables
}

async function getRoute(lat1,lng1,lat2,lng2) {
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

const getRouteAvoid4L = async (lat1,lng1,lat2,lng2) => {
    var response = await axios.get("https://route.ls.hereapi.com/routing/7.2/calculateroute.json", {
        params: {
            apiKey:"x3u91OpwIPzEJL_v89yy8xy7V1tZxjdB83oA7b3PL70",
            waypoint0:`${geoStr}${lat1},${lng1}`,
            waypoint1:`${geoStr}${lat2},${lng2}`, 
            routeattributes:"wp,sm,sh,sc",
            mode:"fastest;truck;motorway:-3",
            metricSystem: "imperial"
        }
    });
    return response;
}

async function getCoord(street,city,state) {
    var response = await axios.get("https://geocoder.ls.hereapi.com/6.2/geocode.json", {
        params: {
            apiKey:"x3u91OpwIPzEJL_v89yy8xy7V1tZxjdB83oA7b3PL70",
            searchtext:`${street},${city},${state}`
        }
    });
    return response;
}

const conditions = [
    {
        key: 'less-than',
        text: '<'
    },
    {
        key: 'less-equal',
        text: '<='
    },
    {
        key: 'greater-than',
        text: '>'
    },
    {
        key: 'greater-equal',
        text: '>='
    },
    {
        key: 'equal-to',
        text: '='
    }
];

const operations = [
    {
        key: 'addFlat',
        text: 'Add Flat'
    },
    {
        key: 'addPerMile',
        text: 'Add Per Mile'
    },
    {
        key: 'addPer4LaneMile',
        text: 'Add Per Mile On 4-Lane Roads'
    }
];

const states = [
    {
        key: 'AL',
        text: 'Alabama',
        base: 6,
        broker: 0
    },
    {
        key: 'AK',
        text: 'Alaska',
        base: 0,
        broker: 0
    },
    {
        key: 'AZ',
        text: 'Arizona',
        base: 0,
        broker: 0
    },
    {
        key: 'AR',
        text: 'Arkansas',
        base: 0,
        broker: 0
    },
    {
        key: 'CA',
        text: 'California',
        base: 0,
        broker: 0
    },
    {
        key: 'CO',
        text: 'Colorado',
        base: 0,
        broker: 0
    },
    {
        key: 'CT',
        text: 'Connecticut',
        base: 0,
        broker: 0
    },
    {
        key: 'DE',
        text: 'Delaware',
        base: 0,
        broker: 0
    },
    {
        key: 'DC',
        text: 'District of Columbia',
        base: 0,
        broker: 0
    },
    {
        key: 'FL',
        text: 'Florida',
        base: 0,
        broker: 0
    },
    {
        key: 'GA',
        text: 'Georgia',
        base: 8,
        broker: 15
    },
    {
        key: 'ID',
        text: 'Idaho',
        base: 0,
        broker: 0
    },
    {
        key: 'IL',
        text: 'Illinois',
        base: 0,
        broker: 0
    },
    {
        key: 'IN',
        text: 'Indiana',
        base: 0,
        broker: 0
    },
    {
        key: 'IA',
        text: 'Iowa',
        base: 0,
        broker: 0
    },
    {
        key: 'KS',
        text: 'Kansas',
        base: 0,
        broker: 0
    },
    {
        key: 'KY',
        text: 'Kentucky',
        base: 0,
        broker: 0
    },
    {
        key: 'LA',
        text: 'Louisiana',
        base: 0,
        broker: 0
    },
    {
        key: 'ME',
        text: 'Maine',
        base: 0,
        broker: 0
    },
    {
        key: 'MD',
        text: 'Maryland',
        base: 0,
        broker: 0
    },
    {
        key: 'MA',
        text: 'Massachusetts',
        base: 0,
        broker: 0
    },
    {
        key: 'MI',
        text: 'Michigan',
        base: 0,
        broker: 0
    },
    {
        key: 'MN',
        text: 'Minnesota',
        base: 0,
        broker: 0
    },
    {
        key: 'MS',
        text: 'Mississippi',
        base: 0,
        broker: 0
    },
    {
        key: 'MO',
        text: 'Missouri',
        base: 0,
        broker: 0
    },
    {
        key: 'MT',
        text: 'Montana',
        base: 0,
        broker: 0
    },
    {
        key: 'NE',
        text: 'Nebraska',
        base: 0,
        broker: 0
    },
    {
        key: 'NV',
        text: 'Nevada',
        base: 0,
        broker: 0
    },
    {
        key: 'NH',
        text: 'New Hampshire',
        base: 0,
        broker: 0
    },
    {
        key: 'NJ',
        text: 'New Jersey',
        base: 0,
        broker: 0
    },
    {
        key: 'NM',
        text: 'New Mexico',
        base: 0,
        broker: 0
    },
    {
        key: 'NY',
        text: 'New York',
        base: 0,
        broker: 0
    },
    {
        key: 'NC',
        text: 'North Carolina',
        base: 12,
        broker: 15
    },
    {
        key: 'ND',
        text: 'North Dakota',
        base: 0,
        broker: 0
    },
    {
        key: 'OH',
        text: 'Ohio',
        base: 0,
        broker: 0
    },
    {
        key: 'OK',
        text: 'Oklahoma',
        base: 0,
        broker: 0
    },
    {
        key: 'OR',
        text: 'Oregon',
        base: 0,
        broker: 0
    },
    {
        key: 'PA',
        text: 'Pennsylvania',
        base: 0,
        broker: 0
    },
    {
        key: 'RI',
        text: 'Rhode Island',
        base: 0,
        broker: 0
    },
    {
        key: 'SC',
        text: 'South Carolina',
        base: 0,
        broker: 15
    },
    {
        key: 'SD',
        text: 'South Dakota',
        base: 0,
        broker: 0
    },
    {
        key: 'TN',
        text: 'Tennessee',
        base: 0,
        broker: 0
    },
    {
        key: 'TX',
        text: 'Texas',
        base: 0,
        broker: 0
    },
    {
        key: 'UT',
        text: 'Utah',
        base: 0,
        broker: 0
    },
    {
        key: 'VT',
        text: 'Vermont',
        base: 0,
        broker: 0
    },
    {
        key: 'VA',
        text: 'Virginia',
        base: 0,
        broker: 0
    },
    {
        key: 'WA',
        text: 'Washington',
        base: 0,
        broker: 0
    },
    {
        key: 'WV',
        text: 'West Virginia',
        base: 0,
        broker: 0
    },
    {
        key: 'WI',
        text: 'Wisconsin',
        base: 0,
        broker: 0
    },
    {
        key: 'WY',
        text: 'Wyoming',
        base: 0,
        broker: 0
    }
];


export {
    sortVariables,
    getRoute,
    getRouteAvoid4L,
    getCoord,
    states,
    conditions,
    operations
}