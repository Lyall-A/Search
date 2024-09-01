const Server = require("./http/Server");
const DirRouter = require("./http/DirRouter");
const config = require("./config.json");

const server = new Server();
new DirRouter("static", server.router);
new DirRouter("public", server.router, { dontPreload: true });

server.listen(config.port, () => console.log(`Listening at :${config.port}`));