import http from "node:http";
import fs from "node:fs";
import path from "node:path";
var mime = require('mime-types') // para los myme types
 
const publicDirectory = path.join(__dirname, "..", "public");
 
const server = http.createServer((req, res) => {
    // Solo aceptamos peticiones GET
    if (req.method !== "GET") {
        res.writeHead(405);
        res.end("Method Not Allowed");
        return;
      }
 // Si no hay URL, devolvemos un error 400
  if (!req.url) {
    res.writeHead(400);
    res.end("Bad Request");
    return;
  }
 // se asigna la ruta del archivo a filePath
  let filePath = path.join(
    publicDirectory,
    req.url === "/" ? "index.html" : req.url
  );
    
  const ext = path.extname(filePath);  //obtenemos la extension del archivo
  
  let contentType = mime.lookup(ext) //obtenemos el mime type del archivo
 
 
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.log(err);
      if (err.code === "ENOENT") {
        res.writeHead(404);
        res.end("Not Found");
      } else {
        res.writeHead(500);
        res.end("Internal Server Error");
      }
      return;
    }
 
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
});
 
server.listen(5500, () =>
  console.log("Servidor ejecutándose en http://localhost:5500/")
);