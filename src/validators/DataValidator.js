const {param} = require("express-validator");

const DataValidator = {
    idValidator(name){
        return param(name)
            .exists()
            .isLength({
                min:24,
                max:24
            })
            .withMessage('id must be at 24 character');
    },
}
module.exports = DataValidator