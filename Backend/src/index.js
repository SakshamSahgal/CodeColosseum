require("dotenv").config()
const port = process.env.BACKEND_PORT || 5000
const { app } = require("./app");
const authRouter = require("./routes/authRouter.js");
const adminRouter = require("./routes/adminRouter.js");
const { isAdmin } = require("./middlewares/TokenValidation.js");

app.use("/auth", authRouter);
app.use("/admin", isAdmin, adminRouter);

app.get("/hi", (req, res) => {
  res.send("Hello World");
})

app.listen(port, () => {
  console.log(`My Server running on port ${port}`)
})