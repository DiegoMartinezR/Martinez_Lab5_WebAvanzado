const http=require('http');
const url=require('url');
const fs=require('fs');
const querystring = require('querystring');

const mime = {
   'html' : 'text/html',
   'css'  : 'text/css',
   'jpg'  : 'image/jpg',
   'ico'  : 'image/x-icon',
   'mp3'  : 'audio/mpeg3',
   'mp4'  : 'video/mp4'
};

const servidor=http.createServer((pedido ,respuesta) => {
    const objetourl = url.parse(pedido.url);
  let camino='public'+objetourl.pathname;
  if (camino=='public/'){
    camino='public/index.html';
  }else if(camino=='public/nosotros'){
    camino='public/nosotros.html';
  }else if(camino=='public/servicios'){
    camino='public/servicios.html';
  }else if(camino=='public/contactenos'){
    camino='public/contactenos.html';}
  // }else if(camino=='public/respuesta'){
  //   camino='public/respuesta.html';
  // }
  
  encaminar(pedido,respuesta,camino);

});

servidor.listen(3000);


function encaminar (pedido,respuesta,camino) {
  console.log(camino);
  switch (camino) {
    case 'public/respuesta': {
      recuperar(pedido,respuesta);
      break;
    }	
    default : {  
      fs.stat(camino, error => {
        if (!error) {
        fs.readFile(camino,(error, contenido) => {
          if (error) {
            respuesta.writeHead(500, {'Content-Type': 'text/plain'});
            respuesta.write('Error interno');
            respuesta.end();					
          } else {
            const vec = camino.split('.');
            const extension=vec[vec.length-1];
            const mimearchivo=mime[extension];
            respuesta.writeHead(200, {'Content-Type': mimearchivo});
            respuesta.write(contenido);
            respuesta.end();
          }
        });
      } else {
        respuesta.writeHead(404, {'Content-Type': 'text/html'});
        respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');		
        respuesta.end();
        }
      });	
    }
  }	
}


function recuperar(pedido,respuesta) {
  let info = '';
  pedido.on('data', datosparciales => {
    info += datosparciales;
  });
  pedido.on('end', () => {
    const formulario = querystring.parse(info);
    respuesta.writeHead(200, {'Content-Type': 'text/html'});
    const pagina=
  `<
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Theme Made By www.w3schools.com - No Copyright -->
  <title>Bootstrap Theme Simply Me</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
  <style>
  body {
    font: 20px Montserrat, sans-serif;
    line-height: 1.8;
    color: #f5f6f7;
  }
  p {font-size: 16px;}
  .margin {margin-bottom: 45px;}
 
  .bg-4 { 
    background-color: #2f2f2f; /* Black Gray */
    color: #fff;

  }
  .container-fluid {
    padding-top: 70px;
    padding-bottom: 70px;
  }
  .container-fluid2 {
    padding-top: 45px;
    padding-bottom: 45px;
  }


  .navbar {
    padding-top: 15px;
    padding-bottom: 15px;
    border: 0;
    border-radius: 0;
    margin-bottom: 0;
    font-size: 12px;
    letter-spacing: 5px;
  }
  .navbar-nav  li a:hover {
    color: #1abc9c !important;
  }
  </style>
</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-default">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="/">AirSolutions</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav navbar-right">
        <li><a href="/nosotros">Nosotros</a></li>
        <li><a href="/servicios">Servicios</a></li>
        <li><a href="/contactenos">Contáctenos</a></li>
      </ul>
    </div>
  </div>
</nav>


<div class="container mt-4" style="padding-top: 70px">
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="col-xs-12 col-sm-12">
              <div class="resultado">
                  <span style="color:black"><strong>Nombres: </strong> ${formulario['nombre']}</span><br>
                    <span style="color:black"><strong>Apellidos: </strong> ${formulario['apellido']}</span><br>
                  <span style="color:black"><strong>Correo: </strong> ${formulario['email']}</span><br>
                  <span style="color:black"><strong>Teléfono: </strong> ${formulario['tel']}</span><br>
                  <span style="color:black"><strong>Fecha de Nacimiento: </strong> ${formulario['fecha']}</span><br>
                  <span style="color:black; width:150px"><strong>Mensaje: </strong> ${formulario['mensaje']}</span>
                </div>
          </div>
        </div>
      </div>
    </div>

    <div style="color:black; text-align: center;" class="font-italic mt-4">Muy pronto nos pondremos en contacto. Gracias !!</div>
  </div>


<footer style="margin-top: 130px" class="container-fluid2 bg-4 text-center">
  <p>Diseño Web - Infraestructura - Marketing Digital <a href="https://www.w3schools.com"></a></p> 
</footer>

</body>
</html>
`;
    respuesta.end(pagina);
  });	
}

console.log('Servidor web iniciado');