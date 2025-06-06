
import Psychologist from "./psychologist.model.js"


export const getAll = async (req, res) => {
    try {
        const psychologists = await Psychologist.find();
        if (psychologists.length === 0) {
            return res.status(404).send({ message: 'Psychologists not found' });
        }
        return res.send({ message: 'Psychologists found', psychologists });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Error retrieving Psychologists" });
    }
}

export const save = async (req, res) => {
    try {
        const data = req.body;
        const psychologist = new Psychologist(data);
        await psychologist.save();
        return res.send({
            success: true,
            message: `Psychologist created successfully`
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: 'General error when creating Psychologist',
            err
        });
    }
}

export const updatePsychologist = async (req, res) => {
    try {
        const { PsychologistId } = req.params;
        const updates = req.body;

        const existingPsychologist = await Psychologist.findById(PsychologistId);
        if (!existingPsychologist) {
            return res.status(404).send({ message: 'Psychologist not found' });
        }

        const updatedPsychologist = await Psychologist.findByIdAndUpdate(PsychologistId, updates, { new: true });

        return res.send({ message: 'Psychologist updated successfully', updatedPsychologist });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating Psychologist', err });
    }
}

export const deletePsychologist = async (req, res) => {
    try {
        const { PsychologistId } = req.params;

        const existingPsychologist = await Psychologist.findById(PsychologistId);
        if (!existingPsychologist) {
            return res.status(404).send({ message: 'Psychologist not found' });
        }

        await Psychologist.findByIdAndDelete(PsychologistId);

        return res.send({ message: 'Psychologist deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting Psychologist', err });
    }
}
