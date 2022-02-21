'use strict';

function sortVariables (variables) {
    variables.sort((a, b) => (a.name > b.name) ? 1 : -1);
    return variables
}

module.exports = sortVariables