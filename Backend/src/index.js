require("dotenv").config()
const port = process.env.BACKEND_PORT || 5000
const { app } = require("./app");
const authRouter = require("./routes/authRouter.js");
const adminRouter = require("./routes/adminRouter.js");
const compilerRouter = require("./routes/compilerRouter.js");
const profileRouter = require("./routes/profileRouter.js");
const placeHolderRouter = require("./routes/placeHolder.js");
const path = require('path');

const { isAdmin, isUser } = require("./middlewares/TokenValidation.js");
const { connectDB } = require("./db/mongoOperations.js");
const { updateActivity } = require("./middlewares/updateActivity.js");


app.listen(port, () => {
  console.log(`My Server running on port ${port}`)
  connectDB();
})

app.use("/auth", authRouter);
app.use("/admin", isAdmin, updateActivity, adminRouter);
app.use("/compiler", isUser, updateActivity, compilerRouter);
app.use("/user", isUser, updateActivity, profileRouter);
app.use("/placeholder", isUser, updateActivity, placeHolderRouter);


app.get("/health", (req, res) => {
  res.status(200).send("Health OK");
})

//this route is used to serve the react app
//it should be the last route because it is a catch all route, so if no other route is matched then this route is used
//this is done so that the react app can handle the routing, and the server doesn't interfere with it

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", 'build', 'index.html'));
});
