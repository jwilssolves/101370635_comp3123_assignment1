const { app } = require("./app");
const mongoose = require("mongoose");

const PORT = 3050;
// TODO: Create URI on MongoDB Atlas and paste the URI here.
// Uym4NuyoXx4mNjDk
const URI = "mongodb+srv://wilsonjordan:Uym4NuyoXx4mNjDk@cluster0.lekjgxp.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(URI, {
    dbName: "full-stack"
}).then(() => {
    console.log("Database connected successfully!");
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

app.listen(PORT, console.log(`Listening to port ${PORT}`));

module.exports = app;