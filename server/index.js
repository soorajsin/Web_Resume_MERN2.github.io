const express = require("express");
const app = new express();
const port = 4000;


app.get("/", (req, res) => {
          res.send("<h1>Hello World</h1>");
})


app.listen(port, () => {
          console.log(`Server is running on ${port}`);
})