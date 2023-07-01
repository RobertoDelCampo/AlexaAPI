import axios from 'axios';

export default async function handler(req, res) {
    console.log(`Received a request: ${req.method}`)
    if (req.method === 'POST') {
        try{
            const data = JSON.stringify(req.body, null, 2)
            console.log(`Received POST: \n${data}`)
            res.status(200).json({
                version: "1.0",
                response: {
                  outputSpeech: {
                    type: "PlainText",
                    text: "Hello",
                  },
                  shouldEndSession: true,
                }
            })
        }
        catch(error){
            console.log(`Error: ${error}`)
            res.status(200).json({ 
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

        
    }
    else {
        res.status(400).json({ error: 'This endpoint requires a POST request.' })
    }
}

