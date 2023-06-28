import axios from 'axios';

// Función auxiliar para formatear la fecha y la hora
function formatDateTime(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan desde 0
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

// Función para obtener el mensaje según la intención
function getMessageByIntent(intent) {
  var intentName = intent.name;
  var slots = intent.slots;
  
  switch (intentName) {
    // Aquí se pueden añadir más casos según las intenciones que se tengan.
    case 'AC_SetTemp':
      var temp = slots.temperatura.value
      return `La temperatura se ha establecido a ${temp}`, false;
    case 'AC_Off':
      return 'He apagado el clima', false;
    default:
      console.log(`Intencion desconocida: ${intentName}`);
      return 'Intención no reconocida, que deseas hacer?', true;
  }
}

export default function handler(req, res) {
  // Asegúrate de que la solicitud es un POST
  console.log(`Received a request: ${req}`)
  if (req.method === 'POST') {
    try {
      // Obtiene el cuerpo de la solicitud
      const data = JSON.stringify(req.body.request, null, 2);

      // Crea un nombre de archivo basado en la fecha y hora actuales
      const filename = `log_${formatDateTime(new Date())}.json`;

      // Escribe en la consola de Vercel
      console.log(`Filename: ${filename}`);
      console.log(`Data: ${data}`);

      // Comprueba si hay una intención
      const intent = req.body.request.intent;
      
      let text = '';
      let remainSession = false;
      if (intent) {
        text, remainSession = getMessageByIntent(intent);
      } else {
        // Si no hay intención, pregunta al usuario qué quiere hacer y mantiene la sesión abierta
        text, remainSession = "Dime, ¿qué deseas hacer?", true;
      }

      // Devuelve una respuesta indicando que la solicitud fue exitosa
      res.status(200).json({
        version: "1.0",
        response: {
          outputSpeech: {
            type: "PlainText",
            text: text,
          },
          shouldEndSession: remainSession,
        },
      });
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir y devuelve una respuesta de error
      console.log(`Error: ${error}`)
      res.status(500).json({ 
        version: "1.0",
        response: {
          outputSpeech: {
            type: "PlainText",
            text: `Ocurrio un error: ${error}`
          },
          shouldEndSession: true
        }
      });
    }
  } else {
    // Si la solicitud no es un POST, devuelve un mensaje de error
    console.log(`Se espera una solicitud POST, recibido ${req.method}`);
    res.status(400).json({ error: 'This endpoint requires a POST request.' });
  }
}
