import { sortVariables, getRoute, getCoord } from '../../src/utils'

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

test('finds the route details that exist using the Here api', () => {
    //creating some coordinates to test
    const lat1 = 34.1228242
    const lat2 = 35.1228242
    const lng1 = -80.8976279
    const lng2 = -81.8976279
    //check if api populated the route
    expect(getRoute(lat1,lng1,lat2,lng2)).toBeDefined()
})

test('Here api does not return a non-existing route', () => {
    //creating fake coordinates to test
    const lat1 = "dsadsfsd"
    const lat2 = 500000000
    const lng1 = "dadsdfds"
    const lng2 = -7000000
    //check to see that no attempt was made to create a route
    expect(getRoute(lat1,lng1,lat2,lng2)).toMatchObject({})
})

test('Here api finds coordinates for a location', () => {
    //creating values for a location to find its coordinates
    const street = "211 Main Street"
    const city = "Columiba"
    const state = "SC"
    //check to see that coordinates were found
    expect(getCoord(street,city,state)).toBeDefined()
})

test('Here api does not return anything if address is fake', () => {
    //creating values for a location to find its coordinates
    const street = "my house"
    const city = "candy"
    const state = "land"

    //check to see that coordinates were found
    expect(getCoord(street,city,state)).toMatchObject({})
})