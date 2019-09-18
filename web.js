var http = require('http');
fs = require('fs');
var url=require('url');
var querystring = require('querystring');

const mime = {
   'html' : 'text/html',
   'css'  : 'text/css',
   'js'   : 'text/js',
   'jpg'  : 'image/jpg',
   'png'  : 'image/png',
   'ico'  : 'image/x-icon',
   'mp3'  : 'audio/mpeg3',
   'mp4'  : 'video/mp4',
   'gif'  : 'gif',
};

var servidor = http.createServer(function(req,res){
    console.log(req.url)
    var ruta = req.url;
    
    
    if (ruta == "/") {
        fs.readFile('index.html' ,function(err,html){
            res.write(html);
            res.end();
        });
    }else if(ruta == "/nosotros"){
        fs.readFile('nosotros.html' ,function(err,html){
            res.write(html);
            res.end();
        });
    }else if(ruta == "/servicios"){
        fs.readFile('servicios.html' ,function(err,html){
            res.write(html);
            res.end();
        });
    }else if(ruta == "/contactenos"){
        fs.readFile('contactenos.html' ,function(err,html){
            res.write(html);
            res.end();
        });
    }else{
        fs.readFile('error.html',function(err,html){
            res.write(html);
            res.end();
        });
    };

    


});

servidor.listen(3000);


// function encaminar (pedido,respuesta,camino) {
//   console.log(camino);
//   switch (camino) {
//     case 'public/recuperardatos': {
//       recuperar(pedido,respuesta);
//       break;
//     }   
//     default : {  
//       fs.stat(camino, error => {
//         if (!error) {
//         fs.readFile(camino,(error, contenido) => {
//           if (error) {
//             respuesta.writeHead(500, {'Content-Type': 'text/plain'});
//             respuesta.write('Error interno');
//             respuesta.end();                    
//           } else {
//             const vec = camino.split('.');
//             const extension=vec[vec.length-1];
//             const mimearchivo=mime[extension];
//             respuesta.writeHead(200, {'Content-Type': mimearchivo});
//             respuesta.write(contenido);
//             respuesta.end();
//           }
//         });
//       } else {
//         respuesta.writeHead(404, {'Content-Type': 'text/html'});
//         respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');       
//         respuesta.end();
//         }
//       });   
//     }
//   } 
// }
