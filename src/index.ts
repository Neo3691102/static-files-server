import http from "node:http";
import fs from "node:fs";
 
const server = http.createServer((req, res) => {
  // Verificamos la url
  if (req.url === "/index.html") {
    // Leemos el archivo
    fs.readFile("./public/index.html", (err, content) => {
      // Manejamos error de lectura
      if (err) {
        console.log(err);
        res.writeHead(500);
        res.end("Internal Server Error");
      } else {
        // Agregamos la cabecera Content-Type y enviamos el contenido
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  } else {
    // En caso la url no apunte a /index.html
    res.writeHead(404);
    res.end("Not Found");
  }
});
 
server.listen(5500, () =>
  console.log("Servidor ejecutándose en http://localhost:5500/")
);