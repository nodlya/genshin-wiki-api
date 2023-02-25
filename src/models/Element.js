const mongoose = require('mongoose');

const Element = new mongoose.Schema(
    {
        name: String,
        image: String
    }
);
module.exports = {
    Element: mongoose.model('Elements', Element),
};
