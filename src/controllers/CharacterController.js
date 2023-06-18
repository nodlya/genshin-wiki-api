const {Character,ProfileCharacter} = require('../models/Character');
const mongoose = require('mongoose');
const {WeaponType} = require("../models/Weapon");
const {Element} = require("../models/Element");
const {Ability} = require("../models/Ability");
const {validationResult} = require("express-validator");

const CharacterController = {
    async getAllCharacters(req,res) {
        try{
            const characters = await ProfileCharacter.find({})
                .populate({ path: 'weaponType', model: WeaponType })
                .populate({ path: 'element', model: Element })
                .populate({
                    path: 'character_id',
                    model: Character,
                    populate: [
                        {
                            path: 'handAbility', model: Ability, transform:(doc)=>doc??null
                        },
                        {
                            path: 'elementAbility', model: Ability, transform:(doc)=>doc??null
                        },
                        {
                            path: 'burstAbility', model: Ability, transform:(doc)=>doc??null
                        },
                    ]
                })
            ;
            if(characters){
                res.json({
                    data:characters
                });
            }
            else{
                res.status(404).json({
                    message: "characters doesn't found",
                });
            }
        }
        catch (ex){
            res.status(500).json({
                message: "aplication error",
            });
        }
    },
    async getCharacterById(req,res){
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const error = errors.array()[0]
                return res.status(400).json({msg:error.msg,id:error.value})
            }

            const characterId = req.params.characterId.trim()
            const character = await ProfileCharacter.findOne({_id: mongoose.Types.ObjectId(characterId)})
                .populate({ path: 'weaponType', model: WeaponType })
                .populate({ path: 'element', model: Element })
                .populate({
                    path: 'character_id',
                    model: Character,
                    populate: [
                        {
                            path: 'handAbility', model: Ability, transform:(doc)=>doc??""
                        },
                        {
                            path: 'elementAbility', model: Ability, transform:(doc)=>doc??""
                        },
                        {
                            path: 'burstAbility', model: Ability, transform:(doc)=>doc??""
                        },
                    ]
                });

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