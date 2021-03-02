const fs = require("fs");
const http = require("http");
const axios = require("axios");

const URLProv = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const URLClientes = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";

//Mostrar HTML en servidor web
const getFileContent = (callback) => {
    fs.readFile("index.html", (err, data) => {
        callback(data.toString());
    });
};

//Correr Servidor Web
http
  .createServer((req, res) => {
    getFileContent((data) => {
      if(req.url === "/api/proveedores"){
        axios.get(URLProv).then(function (response) {
          let proveedores = response.data;
          let infoProv = "";
          proveedores.forEach(i => {
            let temp = `<tr><td>${i.idproveedor}</td><td>${i.nombrecompania}</td><td>${i.nombrecontacto}</td></tr>`;
            infoProv += temp;
          });
          data = data.replace("{{contenido}}", infoProv);
          res.end(data);
          console.log("Se cargó de forma exitosa Proveedores");      
        })
        .catch(function (error) {
          console.log(error);
        });
      } else if(req.url === "/api/clientes"){
        axios.get(URLClientes).then(function (response) {
          let clientes = response.data;
          let infoClientes = "";
          clientes.forEach(i => {
            let temp = `<tr><td>${i.idCliente}</td><td>${i.NombreCompania}</td><td>${i.NombreContacto}</td></tr>`;
            infoClientes += temp;
          });
          data = data.replace("{{contenido}}", infoClientes);
          res.end(data);
          console.log("Se cargó de forma exitosa Clientes");      
        })
        .catch(function (error) {
          console.log(error);
        });
      } else{
        console.log("URL incorrecta");
      }
    });
  }).listen(8081);
