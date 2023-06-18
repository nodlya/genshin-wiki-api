const mongoose = require('mongoose');

const Character = new mongoose.Schema(
    {
        image: String,
        location: String,
        sex: Boolean,
        birthday: String,
        description: String,
        handAbility: String,
        elementAbility: String,
        burstAbility: String
    }
);
const ProfileCharacter = new mongoose.Schema({
        character_id: String,
        image: String,
        name: String,
        countOfStars: Number,
        weaponType: String,
        element: String
    }
);

module.exports = {
    Character: mongoose.model('Characters', Character),
    ProfileCharacter: mongoose.model('ProfileCharacters', ProfileCharacter),
}