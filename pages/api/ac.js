import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        var { request } = req.body
        const data = JSON.stringify(request, null, 2)

        console.log(`Received POST: \n${data}`)
        
    }
}

