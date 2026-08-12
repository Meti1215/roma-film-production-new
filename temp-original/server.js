const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const routes = {
  '/': 'src/app/page.html',
  '/globals.css': 'src/app/globals.css',
  '/site-interactions.js': 'src/components/SiteInteractions.js'
};
const port = Number(process.env.PORT) || 3000;
const mimeTypes = {
  '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.webp': 'image/webp'
};

http.createServer((req, res) => {
  const requestPath = decodeURIComponent(req.url.split('?')[0]);
  const relativePath = routes[requestPath] || (requestPath.startsWith('/assets/') ? `public${requestPath}` : '');
  const filename = path.resolve(root, relativePath);

  if (!relativePath || !filename.startsWith(root + path.sep)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  fs.readFile(filename, (error, file) => {
    if (error) {
      res.writeHead(error.code === 'ENOENT' ? 404 : 500).end(error.code === 'ENOENT' ? 'Not found' : 'Server error');
      return;
    }
    res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filename).toLowerCase()] || 'application/octet-stream' });
    res.end(file);
  });
}).listen(port, () => console.log(`Firansibekan website is running at http://localhost:${port}`));
