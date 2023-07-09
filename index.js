const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT | 5000;
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>
    console.log("MongoDB Connected!"))
.catch((err)=>
    console.log(err));

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
