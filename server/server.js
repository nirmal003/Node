// import axios from "axios";
import app from "./app.js";

// func();
// async function func() {
//   const { data } = await axios.get(`http://localhost:${process.env.PORT}`);
//   console.log(data);
// }

app.listen(process.env.PORT, () =>
  console.log(`Server working on http://localhost:${process.env.PORT}`)
);
