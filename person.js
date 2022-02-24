/**
 * Simple Person object. A container that formats incoming data and generates formatted aggregated data.
 */
class Person {
    /**Constructor that formats names and city to be capitalized, puts state to uppercase, and 
     * type checks age.
     * 
     * @param {String} fName First Name
     * @param {String} lName Last Name
     * @param {String} address Street Address(es)
     * @param {String} city City
     * @param {String} state State as 2 letter representation
     * @param {Number} age age in numeric format
     */
    constructor(fName, lName, address, city, state, age) {
        fName = fName.charAt(0).toUpperCase() + fName.substring(1, fName.length)
        lName = lName.charAt(0).toUpperCase() + lName.substring(1, lName.length)
        city = city.charAt(0).toUpperCase() + city.substring(1, city.length)
        if (state.length > 2) throw `${state} is not formatted as 2 character US state!`
        if (isNaN(age)) throw `${age} is not a valid numeric value!`
        Object.assign( this, {fName, lName, address, city, state, age} )
    }
    /**Generates a string representation of this object's address in clear english.
     * 
     * @returns String representing full address.
     */
    getFullAddress() {
        return `${this.address} ${this.city}, ${this.state}`
    }
    /** Generates a string representation of this object in clear english.
     * 
     * @returns all data as a formatted String for output.
     */
    toString() {
        return `${this.fName} ${this.lName}, age ${this.age}, lives at ${this.address} in ${this.city}, ${this.state}`
    }
}