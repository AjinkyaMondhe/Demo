const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
mongoose.connect(
  "mongodb://0.0.0.0:27017/appdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("Connected to the database");
    } else {
      console.log("Error connecting to the database:", err);
    }
  }
);

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  page: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Model = mongoose.model("myapp", schema);

// POST Route
app.post("/post", async (req, res) => {
  console.log("Inside the POST route");

  const { id, page, description, status } = req.body;

  try {
    const newData = new Model({
      id,
      page,
      description,
      status,
    });

    await newData.save();
    res.send("Data posted successfully");
  } catch (error) {
    console.error("Error posting data:", error);
    res.status(500).send("Failed to post data");
  }
});

// PUT or UPDATE Route
app.put("/update/:id", async (req, res) => {
  const updateId = req.params.id;
  const { page, description, status } = req.body;

  try {
    const updatedData = await Model.findOneAndUpdate(
      { id: updateId },
      { $set: { page, description, status } },
      { new: true }
    );
    if (updatedData) {
      res.send(updatedData);
    } else {
      res.status(404).send("Data not found");
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Failed to update data");
  }
});

// GET All Tasks Route
app.get("/fetch", async (req, res) => {
  try {
    const allTasks = await Model.find();
    res.send(allTasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Failed to fetch tasks");
  }
});

// GET or FETCH Route
app.get("/fetch/:id", async (req, res) => {
  const fetchId = req.params.id;

  try {
    const fetchedData = await Model.find({ id: fetchId });
    if (fetchedData.length > 0) {
      res.send(fetchedData);
    } else {
      res.status(404).send("Data does not exist");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Failed to fetch data");
  }
});

// DELETE Route
app.delete("/del/:id", async (req, res) => {
  const deleteId = req.params.id;

  try {
    const deletedData = await Model.findOneAndDelete({ id: deleteId });
    if (deletedData) {
      res.send(deletedData);
    } else {
      res.status(404).send("Wrong ID or ID isn't present");
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Failed to delete data");
  }
});

app.listen(3001, () => {
  console.log("Server is running on Port 3001");
});
