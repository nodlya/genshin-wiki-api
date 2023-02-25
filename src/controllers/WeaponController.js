const {Weapon,WeaponType} = require('../models/Weapon');

const WeaponController = {
    async getAllWeapon(req,res){
        try{
            const weapons = await Weapon.find({})
                .populate({ path: 'type', model: WeaponType });
            res.json({
                data:weapons
            });
        }
        catch (ex){
            res.status(500).json({
                message: "aplication error",
            });
        }
    }
}
module.exports = WeaponController;