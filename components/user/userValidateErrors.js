module.exports = {
    getUser: {
        id: "\"id\" property is required and it must be an integer"
    },

    createUser: {
        id: "\"id\" property is not allowed to be passed",
        email: "\"email\" property is required and must be of type of email",
        username: "\"username\" property is required and it must be an alphanumeric string of minimum of 4 and maximum of 15 characters",
        password: "\"password\" property is required and it must be an alphanumeric string with a minimum of 1 uppercase letter and a minimum length of 8 characters",
        deletedAt: "\"deletedAt\" property is not allowed to be passed",
        bannedAt: "\"bannedAt\" property is not allowed to be passed",
        birthdayDate: "\"birthdayDate\" property is not required, but if provided, it must be of maximum value of " + new Date(), // TODO: Change from now to -13years
        isDeleted: "\"isDeleted\" property is not allowed to be passed, if wanted to delete user, use DELETE /users/:id route"
    },

    updateUser: {
        id: "\"id\" property is not allowed to be altered",
        email: "\"email\" property must be of type of email",
        username: "\"username\" property must be an alphanumeric string of minimum of 4 and maximum of 15 characters",
        password: "\"password\" property must be an alphanumeric string with a minimum of 1 uppercase letter and a minimum length of 8 characters",
        deletedAt: "\"deletedAt\" property is not allowed to be passed, if wanted to delete user, use DELETE /users/:id route",
        bannedAt: "\"bannedAt\" property value must be a date and it must be less than or equal to " + new Date(),
        birthdayDate: "\"birthdayDate\" property must be of type of date and it must be lower than or equal to " + new Date(), // TODO: Change to -13 years
        isDeleted: "\"isDeleted\" property is not allowed to be passed, if wanted to delete user, use DELETE /users/:id route"
    }
};