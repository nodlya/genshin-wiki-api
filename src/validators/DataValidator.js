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
    dayValidator(){
        return param("dayOfWeek")
            .exists()
            .isLength({
                min:3,
                max:3
            })
            .withMessage('use short name of day');
    }
}
module.exports = DataValidator