import axios from 'axios';

// 🔐 Obtener token de acceso OAuth Account-Level
async function getAccessToken() {
  const credentials = Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64');
  const tokenUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`;

  try {
    const response = await axios.post(tokenUrl, null, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });
    return response.data.access_token;
  } catch (err) {
    console.error('❌ Error al obtener token:', err.response?.data || err.message);
    throw err;
  }
}

// Controlador para crear reunión
export const crearReunion = async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    // Configura los datos de la reunión que quieres crear
    const meetingData = {
      topic: 'Reunión Virtual Psicólogo',
      type: 1, // reunión instantánea
      settings: {
        host_video: true,
        participant_video: true,
      },
    };

    // Llamada a la API de Zoom para crear reunión
    const response = await axios.post(
      `https://api.zoom.us/v2/users/me/meetings`,
      meetingData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Responder con datos de la reunión creada
    res.status(201).json(response.data);
  } catch (error) {
    console.error('❌ Error al crear reunión:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al crear la reunión en Zoom' });
  }
};
