const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 3000;

app.prepare().then(() => {
  const server = express();

  // server.get('/p/:id', (req, res) => {
  //   const actualPage = '/post';
  //   const queryParams = { title: req.params.id };
  //   app.render(req, res, actualPage, queryParams)
  // });

  server.get('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  })
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});