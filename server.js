var port,
    URL,
    http,
    path,
    fs,
    VALID_EXTENSIONS;

port = 8000;
URL = "127.0.0.1";
http = require("http");
path = require("path");
fs = require("fs");

VALID_EXTENSIONS = {
    ".html" : "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".txt": "text/plain",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".png": "image/png",
    ".ico": "image/png"
  };

console.log("Starting web server at " + URL + ":" + port);

http.createServer( function(req, res) {
  var now,
      requestedFilePath,
      extension,
      localPath,
      requestedValidExtension;

  now = new Date();
  requestedFilePath = "/index.html";

  if (req.url && req.url !== '/') {
    requestedFilePath = req.url;
  }

  extension = path.extname(requestedFilePath);
  localPath = __dirname;

  requestedValidExtension = VALID_EXTENSIONS[extension];

  if (requestedValidExtension) {

    localPath += requestedFilePath;
    fs.exists(localPath, function(exists) {
      if(exists) {
        console.log("Serving file: " + localPath);
        getFile(localPath, res, extension);
      } else {
        console.log("File not found: " + localPath);
        res.writeHead(404);
        res.end();
      }
    });

  } else {
    console.log("Not so fast sucka, I don't serve files with the extension: " + extension)
  }

}).listen(port, URL);

function getFile(filePath, res, mimeType) {
  fs.readFile(filePath, function(err, contents) {
    if(!err) {
      res.setHeader("Content-Length", contents.length);
      res.setHeader("Content-Type", mimeType);
      res.statusCode = 200;
      res.end(contents);
    } else {
      res.writeHead(500);
      res.end();
    }
  });
}

