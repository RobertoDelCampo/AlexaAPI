import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Define un objeto JSON en el formato que Alexa envía
      const data = {
        "version": "1.0",
        "session": {
          "new": true,
          "sessionId": "session1234",
          "application": {
            "applicationId": "amzn1.echo-sdk-ams.app.1234"
          },
          "attributes": {},
          "user": {
            "userId": "amzn1.account.AM3B227HF3FAM1B261HK7FFM3A2"
          }
        },
        "context": {
          "System": {
            "application": {
              "applicationId": "amzn1.echo-sdk-ams.app.1234"
            },
            "user": {
              "userId": "amzn1.account.AM3B227HF3FAM1B261HK7FFM3A2"
            },
            "device": {
              "deviceId": "amzn1.ask.device.XXXXXXXXX",
              "supportedInterfaces": {}
            },
            "apiEndpoint": "https://api.amazonalexa.com",
            "apiAccessToken": "AXXXXXXXXX"
          }
        },
        "request": {
          "type": "IntentRequest",
          "requestId": "request5678",
          "timestamp": "2023-06-28T16:27:01Z",
          "locale": "en-US",
          "intent": {
            "name": "EstablecerTemperatura",
            "confirmationStatus": "NONE",
            "slots": {
              "temperatura": {
                "name": "temperatura",
                "value": "23",
                "confirmationStatus": "NONE"
              }
            }
          }
        }
      };

      // Hacer una solicitud POST a /api/alexa con el objeto como cuerpo
      const response = await axios.post('http://localhost:3000/api/alexa', data);

      // Devolver la respuesta de la solicitud POST
      res.status(200).json(response.data);
    } catch (error) {
      // Manejar y devolver cualquier error que pueda ocurrir
      res.status(500).json({ error: 'An error occurred while making the POST request.' });
    }
  } else {
    // Si la solicitud no es un GET, devolver un mensaje de error
    res.status(400).json({ error: 'This endpoint requires a GET request.' });
  }
}
