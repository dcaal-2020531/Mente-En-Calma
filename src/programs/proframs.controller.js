
import Programs from "./programs.model.js"


export const getAll = async (req, res) => {
    try {
        const programss = await Programs.find();
        if (programss.length === 0) {
            return res.status(404).send({ message: 'Programss not found' });
        }
        return res.send({ message: 'Programss found', programss });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Error retrieving Programss" });
    }
}

export const save = async (req, res) => {
    try {
        const data = req.body;
        const programs = new Programs(data);
        await programs.save();
        return res.send({
            success: true,
            message: `Programs created successfully`
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: 'General error when creating Programs',
            err
        });
    }
}

export const updatePrograms = async (req, res) => {
    try {
        const { ProgramsId } = req.params;
        const updates = req.body;

        const existingPrograms = await Programs.findById(ProgramsId);
        if (!existingPrograms) {
            return res.status(404).send({ message: 'Programs not found' });
        }

        const updatedPrograms = await Programs.findByIdAndUpdate(ProgramsId, updates, { new: true });

        return res.send({ message: 'Programs updated successfully', updatedPrograms });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating Programs', err });
    }
}

export const deletePrograms = async (req, res) => {
    try {
        const { ProgramsId } = req.params;

        const existingPrograms = await Programs.findById(ProgramsId);
        if (!existingPrograms) {
            return res.status(404).send({ message: 'Programs not found' });
        }

        await Programs.findByIdAndDelete(ProgramsId);

        return res.send({ message: 'Programs deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting Programs', err });
    }
}