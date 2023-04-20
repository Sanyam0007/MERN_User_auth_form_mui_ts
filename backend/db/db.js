const mongoose = require("mongoose");
const url =
  "mongodb+srv://sanyamkothariofc:V7kl0muVLPZb9XnN@cluster0.zkuqjt6.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
  })
  .then((res) => console.log("mongoose is connected"))
  .catch((err) => console.log(err));
