const mongoose = require('mongoose');

const WeaponType = new mongoose.Schema(
    {
        name: String,
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
);

module.exports = {
    WeaponType: mongoose.model('WeaponTypes', WeaponType),
    Weapon: mongoose.model('Weapons', Weapon)
};