require("dotenv").config()
const port = process.env.BACKEND_PORT || 5000
const { app } = require("./app");
const authRouter = require("./routes/authRouter.js");
const adminRouter = require("./routes/adminRouter.js");
const compilerRouter = require("./routes/compilerRouter.js");
const { isAdmin, isUser } = require("./middlewares/TokenValidation.js");
const { connectDB } = require("./db/mongoOperations.js");
const { updateActivity } = require("./middlewares/updateActivity.js");

app.use("/auth", authRouter);
app.use("/admin", isAdmin, updateActivity, adminRouter);
app.use("/compiler", isUser, updateActivity, compilerRouter);

app.listen(port, () => {
  console.log(`My Server running on port ${port}`)
  connectDB();
})