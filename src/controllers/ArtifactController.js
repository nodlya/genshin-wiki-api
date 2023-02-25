const {Artifact} = require("../models/Artifact");

const ArtifactController = {
    async getAllArtifacts(req, res){
        try{
            const artifacts = await Artifact.find({})
            if(artifacts){
                res.json({
                    data:artifacts
                });
            }
            else{
                res.status(404).json({
                    message: "artifacts doesn't found",
                });
            }
        }
        catch (ex){
            res.status(500).json({
                message: "aplication error",
            });
        }
    }
}
module.exports = ArtifactController