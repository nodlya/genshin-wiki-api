const mongoose = require('mongoose');

const Element = new mongoose.Schema(
    {
        name: String,
        image: String
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
    artifact: mongoose.model('Artifacts', Artifact),
    element: mongoose.model('Elements', Element),
    weapon: mongoose.model('Weapons', Weapon)
}