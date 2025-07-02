const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
const MyServer = express();

function main(){
   const simpleMiddleware = (req, res, next) => {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      console.log(`[+] \t\t\t ( ${ip} )`);
      next();
   };
   MyServer.use(simpleMiddleware);

   MyServer.get('/', (req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type','text/html');
      res.end('<h1> Framework Express Rodando.</h1>');
   });

   const data = [
      { id: 1, name: 'Caio Vicente Ramos', profission: 'Back-End', age: 23 },
      { id: 2, name: 'Bruna Aparecida Bueno', profisson: 'Maquiadora ProLine', age: 32},
      { id: 3, name: 'Roberto Wilson Aguiar', profission: 'Front-End', age: 53},
   ];
   MyServer.get('/json', (req, res) => {
      return res.json(data);
   });

   MyServer.use(express.static(path.join(__dirname, 'public')));

   MyServer.use(bodyParser.urlencoded({ extended: true }));

   MyServer.get('/login', (req, res) => {
      res.statusCode = 200;
      res.sendFile(path.join(__dirname, 'views', 'pagina_Login.html'));
   });

   MyServer.post('/login', (req, res) => {
      const { username, password } = req.body;
      if( username === 'admin' && password === '123456' ) {
//         res.setHeader('Content-Type','text/html');
         res.send('<h1> Parabéns você está logado. </h1>');
      } else {
//         res.setHeader('Content-Type','text/html');
         res.status(401).send('</h1> Usuario e Senha Inválido </h1>');
      }
   });


   const HOST = process.env.HOST;
   const PORT = process.env.PORT;

   if(!PORT || !HOST){
      console.error('Erro, endereço não corresponde ao .env');
   }


   MyServer.listen(PORT, HOST, () => {
      console.clear();
      console.log('\noOo.................... Framework Express ....................oOo\n');

      console.log(`(online)\t\t\thttp://${HOST}:${PORT}/`);
      console.log(`(online)\t\t\thttp://${HOST}:${PORT}/json`);
      console.log(`(online)\t\t\thttp://${HOST}:${PORT}/login`);

      console.log('\n aguardando conexões. \n');
   });
} return main();
