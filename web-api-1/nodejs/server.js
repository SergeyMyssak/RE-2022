const http = require("http");

http.createServer((request, response) => {
    const { method, url } = request;
    console.log(`${method} ${url}`);

    if (url === "/users") {
        response.write("Hello users!");
    } else if (url === "/pets") {
        response.write("Hello pets!");
    } else {
        response.write("Hello world!");
    }

    response.end();
}).listen(3000, () => {
    console.log("Server listening on port 3000");
});
