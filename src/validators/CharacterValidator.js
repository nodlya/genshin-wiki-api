const {param} = require("express-validator");

const CharacterValidator = {
    getCharacterValidator(){
        return param("characterId")
            .exists()
            .isLength({
                min:24,
                max:24
            })
            .withMessage('id must be at 24 character');
    }
}
module.exports = CharacterValidator