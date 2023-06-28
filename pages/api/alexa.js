import axios from 'axios';
import fs from 'fs';
import { promisify } from 'util';

// Convierte fs.writeFile en una función promisificada para que pueda usarse con async/await
const writeFile = promisify(fs.writeFile);

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

export default async function handler(req, res) {
  // Asegúrate de que la solicitud es un POST
  if (req.method === 'POST') {
    try {
      // Obtiene el cuerpo de la solicitud
      const data = JSON.stringify(req.body, null, 2);

      // Crea un nombre de archivo basado en la fecha y hora actuales
      const filename = `log_${formatDateTime(new Date())}.json`;

      // Escribe el archivo .log en el directorio raíz del proyecto. 
      // Si deseas escribir en un directorio diferente, asegúrate de cambiar la ruta.
      await writeFile(`./requests/${filename}`, data);

      // Devuelve una respuesta indicando que la solicitud fue exitosa
      res.status(200).json({ message: 'Log created successfully.' });
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir y devuelve una respuesta de error
      res.status(500).json({ error: 'An error occurred while creating the log.' });
    }
  } else {
    // Si la solicitud no es un POST, devuelve un mensaje de error
    res.status(400).json({ error: 'This endpoint requires a POST request.' });
  }
}
