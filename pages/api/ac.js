import axios from 'axios';

export default async function handler(req, res) {
    console.log(`Received a request: ${JSON.stringify(req, null, 2)}`)
    if (req.method === 'POST') {
        var { request } = req.body
        const data = JSON.stringify(request, null, 2)

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
    else {
        res.status(400).json({ error: 'This endpoint requires a POST request.' })
    }
}

