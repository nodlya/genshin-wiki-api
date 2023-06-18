const mongoose = require('mongoose');

const DungeonResource = new mongoose.Schema(
    {
        dayOfWeek: Number,
        location: String,
        city: String,
        image: String
    }
);

module.exports = {
    DungeonResource: mongoose.model('DungeonResource', DungeonResource),
}