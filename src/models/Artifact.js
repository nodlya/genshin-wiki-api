const mongoose = require('mongoose');

const Artifact = new mongoose.Schema(
    {
        name: String,
        bonus2: String,
        bonus4: String,
        countOfStars: String,
        image: String
    }
);

module.exports = {
    Artifact: mongoose.model('Artifacts', Artifact),
}