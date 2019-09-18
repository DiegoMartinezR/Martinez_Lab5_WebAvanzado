var http=require('http');
var manejador = function(req,res){
    console.log("holis");
    res.write("----<br/>");
    res.end("que tal como andas");
};
var servidor = http.createServer(manejador);
servidor.listen(3000);