import PsychiatricCenter from './psychiatricCenter.model.js'

// Crear centro psiquiátrico
export const createCenter = async (req, res) => {
    try {
        const {
            name,
            licenseNumber,
            description,
            phone,
            email,
            website,
            address,
            services,
            workingHours,
            isPublic
        } = req.body

        const newCenter = new PsychiatricCenter({
            name,
            licenseNumber,
            description,
            phone,
            email,
            website,
            address,
            services,
            workingHours,
            isPublic
        })
        
        await newCenter.save()
        res.status(201).json(newCenter)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al crear el centro' })
    }
}

// Obtener todos los centros
export const getAllCenters = async (req, res) => {
    try {
        const centers = await PsychiatricCenter.find()
        res.status(200).json(centers)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los centros' })
    }
}

// Obtener centro por ID
export const getCenterById = async (req, res) => {
    try {
        const center = await PsychiatricCenter.findById(req.params.id)
        if (!center) return res.status(404).json(
            { message: 'Centro no encontrado' }
        )

        res.status(200).json(center)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el centro' })
    }
}

// Actualizar centro
export const updateCenter = async (req, res) => {
    try {
        const updatedCenter = await PsychiatricCenter.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!updatedCenter) return res.status(404).json(
            { message: 'Centro no encontrado' }
        )

        res.status(200).json(updatedCenter)
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el centro' })
    }
}

// Eliminar centro
export const deleteCenter = async (req, res) => {
    try {
        const center = await PsychiatricCenter.findById(req.params.id)
        if (!center) return res.status(404).json(
            { message: 'Centro no encontrado' }
        )

        await center.deleteOne()
        res.status(200).json({ message: 'Centro eliminado exitosamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el centro' })
    }
}