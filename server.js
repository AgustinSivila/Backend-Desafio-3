const http = require (`http`)
const server = http.createServer( (request, Response) => {
    Response.end(`Holaaaaa`)
    console.log("Se hizo");

} )
server.listen(8080, () =>{
    console.log(`El server esta funcionando`);
})

/*
Entrar a http://192.168.0.217/
Entrar a http://localhost:8080
*/
