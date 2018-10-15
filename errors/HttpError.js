class HttpError extends Error {
    constructor(args) {
        super(); // call Error Class constructor

        this.setPassedProperties(args);
    }

    setPassedProperties(args) {
        // assign all passed arguments to instance properties
        for (let property of Object.keys(args)) {
            this[property] = args[property];
        }
        this.overridePropertiesIfEmpty();
    }

    /*
     * set required properties to default if there are empty
     * call this method instead of creating default object properties because
     * setPassedProperties passed args can corrupts these properties
     */
    overridePropertiesIfEmpty() {
        if (!this.message) {
            this.message = "An error occured on the server";
        }
        if (!this.statusCode) {
            this.statusCode = 500;
        }
    }
}

module.exports = HttpError;