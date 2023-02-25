const mongoose = require('mongoose');

const Ability = new mongoose.Schema(
    {
        name: String,
        type: String,
        description: String,
        image: String
    }
);

module.exports = {
    Ability: mongoose.model('Abilities', Ability),
}