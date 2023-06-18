const {Artifact} = require("../models/Artifact");
const {validationResult} = require("express-validator");
const mongoose = require("mongoose");

const ArtifactController = {
    async getAllArtifacts(req, res) {
        try {
            const artifacts = await Artifact.find({})
            res.json({
                data: artifacts
            });
        } catch (ex) {
            res.status(500).json({
                message: "aplication error",
            });
        }
    },
    async getArtifactById(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const error = errors.array()[0]
                return res.status(400).json({msg: error.msg, id: error.value})
            }
            const artifactId = req.params.artifactId.trim()
            const artifact = await Artifact.findOne({_id: mongoose.Types.ObjectId(artifactId)})

            if (artifact) {
                res.json({
                    data: artifact
                });
            } else {
                res.status(404).json({
                    message: "artifacts doesn't found",
                });
            }
        } catch (ex) {
            res.status(500).json({
                message: "aplication error",
            });
        }
    }
}
module.exports = ArtifactController