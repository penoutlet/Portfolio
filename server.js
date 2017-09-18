var express = require("express");
var PORT = process.env.PORT || 3000;
var app = express();
// // Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.get('/', (req,res) => {

	res.render('index');
});

	app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
