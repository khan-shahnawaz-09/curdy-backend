const mongoose = require("mongoose");
const mongoConnect = async () => {
  console.log("Mongo URI:", process.env.MONGO_URI);
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = { mongoConnect };
