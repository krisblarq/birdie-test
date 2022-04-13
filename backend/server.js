const express = require("express");
const app = express();
const port = 3000;
const eventsRouter = require("./routes/events");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to birdie test" });
});
app.use("/events", eventsRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Birdie app listening at http://localhost:${port}`);
});
