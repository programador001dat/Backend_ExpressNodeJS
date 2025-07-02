// importando as bibliotecas 
const path = require('path');    // configurar diretorio renderizar paginas
const express = require('express');   // Express é o Servidor para Backend
const bodyParser = require('body-parser');   // Receber requisicoes de entrada de formularios

require('dotenv').config();   // importando o dotenv, organizar dados sensiveis em outros lugares, como exemplo IP e PORTA do servidor.
const MyServer = express();   // Estanciando o Express dentro da variavel, MyServer vai ser meu Express

// Criando uma função que vai carregar o codigo. BackEnd
function main(){
   // Estanciando um Middleware, garantindo o proximo fluxo de conectividade.
   const simpleMiddleware = (req, res, next) => {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;   // Retorno o cabeçalho da requisicao, quem acesso. Se estiver usando proxy retorna o proxy.
      console.log(`[+] \t\t\t ( ${ip} )`);   // mostre o IP na tela.
      next();   // Chama middleware e continua o fluxo de rota para o proximo.
   };
   MyServer.use(simpleMiddleware); // Chamar middleware no projeto inteiro.

   // Configurando um rota RAIZ.
   MyServer.get('/', (req, res) => {
      res.statusCode = 200;   // Codigo de SUCESSO.
      res.setHeader('Content-Type','text/html');   // Configurando o cabeçalho, tipo TEXTO/HTML.
      res.end('<h1> Framework Express Rodando.</h1>');   // renderizar uma TAG.
   });

   // Estancia de um objeto JSON-Javascript Object Notation.
   const data = [
      { id: 1, name: 'Caio Vicente Ramos', profission: 'Back-End', age: 28 },
      { id: 2, name: 'Bruna Aparecida Bueno', profisson: 'Maquiadora ProLine', age: 32},
      { id: 3, name: 'Roberto Wilson Aguiar', profission: 'Front-End', age: 53},
   ];
   // Configurando uma nova ROTA. para o JSON
   MyServer.get('/json', (req, res) => {
      res.statusCode = 200; // Codigo de Sucesso.
      res.setHeader('Content-Type', 'application/json'); // cabeçalho de aplicação JSON
      return res.json(data);   // retorne dados JSON, que contem dentro da VARIAVEL data.
   });

   // Servir o modulo, ESTÁTICOS, dentro da pasta PUBLIC. Arquivos CSS, Imagens e outros HTML. Carregar junto com a RENDERIZACAO de pagina.
   MyServer.use(express.static(path.join(__dirname, 'public')));   // pasta com nome PUBLIC obrigatorio criar.

   // Parsear dados da requisicao, permitir entrada. aqui o que for inserido dentro da nossa pagina login, iremos receber.
   MyServer.use(bodyParser.urlencoded({ extended: true })); // bodyParser chama o MODULO, pegue o que ta dentro da URL, e linha 51.

   // Configurando uma nova ROTA para RENDERIZAR a pagina login.html na web.
   MyServer.get('/login', (req, res) => {
      res.statusCode = 200;   // Codigo Sucesso.
      // Enviar o arquivo dentro da pasta VIEWS.
      // pasta com nome VIEWS obrigatorio criar.
      res.sendFile(path.join(__dirname, 'views', 'pagina_Login.html')); // a pasta VIEWS ficara responsavel por guardar os templates HTML
   });  

   
   // Configurando o que vai ser recebido de dentro da pagina, O que o cliente vai nos enviar..
   MyServer.post('/login', (req, res) => {
      // Criando duas estancias, username e password.
      // Tem que CORRESPONDER OS NOMES IGUAIS ao do FORMULARIO</form> do codigo fonte, login.html, pense no id? name=username.
      const { username, password } = req.body; // receber os dados da pagina login.html e GUARDAR dentro das variaveis.
      if( username === 'admin' && password === '123456' ) {    // Aqui seria a validação de entrada. Conceder o acesso se for IGUAL === IGUAL, Okay
         res.send('<h1> Parabéns você está logado. </h1>');    // Enviar.
      } else { 
         res.status(401).send('</h1> Usuario e Senha Inválido </h1>');   // Se não Senha/Usuario errado.
      } // 401 erro não encontrado.
   });

   
   // Importando os dados do .ENV da linha 6
   // Estanciar o IP e a PORTA para abrir o servidor. 
   const HOST = process.env.HOST;
   const PORT = process.env.PORT;

   // Se os dados forem diferente, retorne um ERRO.
   if(!PORT || !HOST){
      console.error('Erro, endereço não corresponde ao .env');
   }

   // Servidor em modo de ESCULTA na port,host, aguardando. retorno de requisições da linha 13,14.
   MyServer.listen(PORT, HOST, () => {
      console.clear();
      console.log('\noOo.................... Framework Express ....................oOo\n');
      // Rotas disponiveis.
      console.log(`(online)\t\t\thttp://${HOST}:${PORT}/`);   // Linha 21, 22, 23
      console.log(`(online)\t\t\thttp://${HOST}:${PORT}/json`);   // Linha 27 ate 35.
      console.log(`(online)\t\t\thttp://${HOST}:${PORT}/login`);   // 44 ate 49, as outras linha apenas estão RECEBENDO os dados, não fazem parte de RENDERIZAÇÂO.

      console.log('\n aguardando conexões. \n');
   });
} return main();   // Chamar funçao
