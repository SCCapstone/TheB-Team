const sortVariables = require('../../src/utils')

test('properly sorts variables alphabetically', () => {
    //creating object to represent users with name attribute
    const person1 = {name:"Alex"}
    const person2 = {name:"Brian"}
    const person3 = {name:"Carter"}
    const person4 = {name:"Oliver"}
    //unsorted array of people's names and the sorted one
    const names = [person4, person1, person3, person2]
    const nameSort = [person1, person2, person3, person4]

    expect(sortVariables(names)).toEqual(nameSort)
})