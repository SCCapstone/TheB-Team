'use strict';

export const sortVariables = (variables) => {
    variables.sort((a, b) => (a.name > b.name) ? 1 : -1);
    return variables
}