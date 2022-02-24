class Parse {
    constructor(rawText) {
        console.log(`Processing...\n${rawText}`)

        this.people = []
        this.houseHolds = new Map()

        var splitArray = rawText.split("\n");

        for (let i = 0; i < splitArray.length; i++) {
            this.addUser(splitArray[i])
        }
    }

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
        let tempPerson = new Person(tempArray[0].toLowerCase(),tempArray[1].toLowerCase(),tempArray[2].toLowerCase(),tempArray[3].toLowerCase(),tempArray[4].toUpperCase(),tempArray[5])
        this.people.push(tempPerson)
        // Add to households
        if (!this.houseHolds.has(tempPerson.getFullAddress())) {
            this.houseHolds.set(tempPerson.getFullAddress(), 1)
        } else {
            this.houseHolds.set(tempPerson.getFullAddress(), this.houseHolds.get(tempPerson.getFullAddress()) + 1)
        }
    }

    getHouseholds() {
        let result = ""
        function concatMapElements(value, key) {
            result += `${key} has ${value} occupants.<br>`
        }
        this.houseHolds.forEach(concatMapElements)
        return result
    }

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

class Person {
    constructor(fName, lName, address, city, state, age) {
        fName = fName.charAt(0).toUpperCase() + fName.substring(1, fName.length)
        lName = lName.charAt(0).toUpperCase() + lName.substring(1, lName.length)
        city = city.charAt(0).toUpperCase() + city.substring(1, city.length)
        Object.assign( this, {fName, lName, address, city, state, age} )
    }

    getFullAddress() {
        return `${this.address} ${this.city}, ${this.state}`
    }

    toString() {
        return `${this.fName} ${this.lName}, age ${this.age}, lives at ${this.address} in ${this.city}, ${this.state}`
    }
}