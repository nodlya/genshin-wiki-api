const {Character,ProfileCharacter} = require('../models/Character');
const mongoose = require('mongoose');
const { BSONTypeError } = require('bson');

const CharacterController = {
    async getAllCharacters(req,res) {
        try{
            const characters = await ProfileCharacter.find({});
            res.json({
                data:characters
            });
        }
        catch (ex){
            console.log(ex);
            res.status(500).json({
                message: "aplication error",
            });
        }
    },
    async getCharacterById(req,res){
        const characterId = req.params.characterId.trim()
        try{
            const character = await Character.findOne({_id: mongoose.Types.ObjectId(characterId)});
            if(character){
                res.json({
                    data:character
                });
            }
            else{
                res.status(404).json({
                    message: "character isn't exist",
                });
            }
        }
        catch (ex){
            if(ex.name.includes("BSONTypeError")){
                res.status(500).json({
                    message: "incorrect size of characterId",
                });
            }
            else{
                res.status(500).json({
                    message: "aplication error",
                });
            }
        }
    }
}
module.exports = CharacterController