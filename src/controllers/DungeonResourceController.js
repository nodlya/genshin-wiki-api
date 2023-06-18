const {DungeonResource} = require("../models/DungeonResource");
const {validationResult} = require("express-validator");

const DungeonResourceController = {
    async getDungeonResourcesByDay(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const error = errors.array()[0]
                return res.status(400).json({msg: error.msg, id: error.value})
            }
            const dayOfWeek = DungeonResourceController.castDatToType(req.params.dayOfWeek.trim().toLowerCase())
            let resources = []
            if(dayOfWeek === 4){
                resources = await DungeonResource.find({})
            }
            else{
                resources = await DungeonResource.find({dayOfWeek: dayOfWeek})
            }
            res.json({
                data: resources
            });
        } catch (ex) {
            console.log(ex)
            res.status(500).json({
                message: "aplication error",
            });
        }
    },
    castDatToType(day) {
        switch (day) {
            case "mon":
                return 1;
            case "tue":
                return 2;
            case "wed":
                return 3;
            case "thu":
                return 1;
            case "fri":
                return 2;
            case "sat":
                return 3;
            default:
                return 4;
        }
    }
}
module.exports = DungeonResourceController;