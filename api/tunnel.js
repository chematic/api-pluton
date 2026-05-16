import axios from 'axios';
import Busboy from 'busboy';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const busboy = Busboy({ headers: req.headers });
  const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

  busboy.on('file', (fieldname, file, info) => {
    const chunks = [];
    file.on('data', (data) => chunks.push(data));

    file.on('end', async () => {
      const buffer = Buffer.concat(chunks);
      const formData = new FormData();
      
      const blob = new Blob([buffer], { type: 'image/png' });
      formData.append('file', blob, 'screenshot.png');

      try {
        await axios.post(DISCORD_WEBHOOK, formData);
        res.status(200).json({ success: true });
      } catch (err) {
        res.status(500).json({ error: 'Failed to send to Discord' });
      }
    });
  });

  req.pipe(busboy);
}