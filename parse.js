/**
 * Parsing object. On construction, the object parses input in format "data","data",... to create person objects.
 * 
 * the incoming text data must have 6 elements per endline or the data is thrown out. Parse is able to process partial data, such as 2 of 3 lines being valid.
 */
class Parse {
    /**
     * Constructor for Parse object. Processes incoming data and generates the people and household objects.
     * These should only be accessed by the getters that sort and aggregate these lists before returning formatted string output.
     * 
     * @param {String} rawText any number of lines, separated by linebreak, with 6 data points each formatted as "data","data",...
     */
    constructor(rawText) {
        console.log(`Processing...\n${rawText}`)

        this.people = []
        this.houseHolds = new Map()

        var splitArray = rawText.split("\n");

        for (let i = 0; i < splitArray.length; i++) {
            this.addUser(splitArray[i])
        }
    }
    /**
     * Parses a line of text for 6 data points in the form of first name, last name, street address, city, state, and age.
     * If all data is present, it is normalized and used to create a person object saved to this object.
     * 
     * @param {String} text string formatted "data","data"... with 6 data points.
     * @returns null on error.
     */
    addUser(text) {
        let textArray = text.substring(1,text.length - 1).split("\"")

        let temp = ""
        let tempArray = []
        for (let i = 0; i < textArray.length; i++) {
            temp = textArray[i].trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            if (temp.length > 0) tempArray.push(temp)
        }
        if (tempArray.length != 6) {
            console.log(`ERROR: user data invalid: ${text}`)
            return;
        }
        try{
            let tempPerson = new Person(tempArray[0].toLowerCase(),tempArray[1].toLowerCase(),tempArray[2].toLowerCase(),tempArray[3].toLowerCase(),tempArray[4].toUpperCase(),tempArray[5])
            this.people.push(tempPerson)
            // Add to households
            if (!this.houseHolds.has(tempPerson.getFullAddress())) {
                this.houseHolds.set(tempPerson.getFullAddress(), 1)
            } else {
                this.houseHolds.set(tempPerson.getFullAddress(), this.houseHolds.get(tempPerson.getFullAddress()) + 1)
            }
        } catch (e) {
            console.log(e)
        }
        
    }
    /**
     * Function to process household data and return it as a single string.
     * 
     * @returns String representation of all households represented, formatted as a sentence each household defining it's address and occupant count.
     */
    getHouseholds() {
        let result = ""
        function concatMapElements(value, key) {
            result += `${key} has ${value} occupants.<br>`
        }
        this.houseHolds.forEach(concatMapElements)
        return result
    }
    /**
     * Function to process person data and return it as a single string.
     * 
     * @returns String representation of all persons age 18 and above, formatted as a sentence for each person defining their data.
     */
    getAdults() {
        // Sort people list first by first name, then last name to get lName, fName sorting order
        this.people.sort((a, b) => a.fName.localeCompare(b.fName))
        this.people.sort((a, b) => a.lName.localeCompare(b.lName))

        let result = ""
        for (let i = 0; i < this.people.length; i++) {
            if (this.people[i].age >= 18) {
                result += `${this.people[i].toString()}.<br>`
            }
        }
        return result
    }
}