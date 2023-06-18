const {Weapon, WeaponType} = require('../models/Weapon');
const {validationResult} = require("express-validator");
const {ProfileCharacter} = require("../models/Character");
const mongoose = require("mongoose");

const WeaponController = {
    async getAllWeapon(req, res) {
        try {
            const weapons = await Weapon.find({})
                .populate({path: 'type', model: WeaponType});
            res.json({
                data: weapons
            });
        } catch (ex) {
            res.status(500).json({
                message: "aplication error",
            });
        }
    },
    async getWeaponById(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const error = errors.array()[0]
                return res.status(400).json({msg: error.msg, id: error.value})
            }
            const weaponId = req.params.weaponId.trim()
            const weapon = await Weapon.findOne({_id: mongoose.Types.ObjectId(weaponId)})
                .populate({path: 'type', model: WeaponType});

            if (weapon) {
                res.json({
                    data: weapon
                });
            } else {
                res.status(404).json({
                    message: "weapon isn't exist",
                });
            }
        } catch (ex) {
            res.status(500).json({
                message: "aplication error",
            });
        }
    }
}
module.exports = WeaponController;