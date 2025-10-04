import axios from 'axios';

export default async function handler(req, res) {
  // 1. CORS (opsional, kalau ingin dipakai di luar domain Anda)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 2. Hanya izinkan GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'GET only' });
  }

  // 3. Ambil & validasi query
  const { query } = req.query;
  if (!query || !query.startsWith('https://')) {
    return res.status(400).json({ message: 'Valid https:// URL required' });
  }

  // 4. Panggil RapidAPI
  try {
    const { data } = await axios.post(
      'https://auto-download-all-in-one.p.rapidapi.com/v1/social/autolink',
      { url: query },
      {
        headers: {
          'x-rapidapi-host': 'auto-download-all-in-one.p.rapidapi.com',
          'x-rapidapi-key': '1dda0d29d3mshc5f2aacec619c44p16f219jsn99a62a516f98',
          'content-type': 'application/json; charset=utf-8',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36 OPR/78.0.4093.184',
          referer: 'https://auto-download-all-in-one.p.rapidapi.com/',
          'cache-control': 'no-cache',
          'accept-encoding': 'gzip'
        }
      }
    );

    // 5. Kirim JSON ke browser
    return res.json(data);
  } catch (e) {
    // 6. Error handling
    return res.status(500).json({
      message: e.response?.data?.message || e.message || 'Internal error'
    });
  }
}
