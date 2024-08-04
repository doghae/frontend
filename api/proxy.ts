import { VercelRequest, VercelResponse } from '@vercel/node';
import http from 'http';
import https from 'https';
import url from 'url';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const requestUrl = req.url ?? ''; // req.url이 undefined일 경우 빈 문자열로 대체
  const targetUrl = `https://doghae.site${requestUrl.replace(/^\/api/, '')}`;

  const parsedUrl = url.parse(targetUrl);
  const protocol = parsedUrl.protocol === 'https:' ? https : http;

  const proxyReq = protocol.request(
    {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.path,
      method: req.method,
      headers: req.headers,
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode!, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    }
  );

  req.pipe(proxyReq, { end: true });

  proxyReq.on('error', (err) => {
    console.error('Proxy request error:', err);
    res.status(500).send('Proxy request failed');
  });
}
