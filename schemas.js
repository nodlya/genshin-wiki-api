const mongoose = require('mongoose');

const ProfileCharacter = new mongoose.Schema({
        characterId: String,
        image: String,
        name: String,
        countOfStars: Number,
        weaponType: String,
        element: String
    }
);

const Element = new mongoose.Schema(
    {
        name: String,
        image: String
    }
);

const Character = new mongoose.Schema(
    {
        name: String,
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

const WeaponType = new mongoose.Schema(
    {
        name: String,
        image: String
    }
);

const Artifact = new mongoose.Schema(
    {
        name: String,
        bonus2: String,
        bonus4: String,
        countOfStars: String,
        image: String
    }
);

const Ability = new mongoose.Schema(
    {
        name: String,
        type: String,
        description: String,
        image: String
    }
);

const Weapon = new mongoose.Schema(
    {
        name: String,
        discription: String,
        type: String,
        passiveAbility: String,
        countOfStars: String,
        editionStat: String,
        image: String,
        stat: String,
    }
)

module.exports = { 
    ability: mongoose.model('Abilities', Ability), 
    weaponType: mongoose.model('WeaponTypes', WeaponType), 
    character: mongoose.model('Characters', Character), 
    artifact: mongoose.model('Artifacts', Artifact), 
    profile: mongoose.model('ProfileCharacters', ProfileCharacter), 
    element: mongoose.model('Elements', Element),
    weapon: mongoose.model('Weapons', Weapon)
}