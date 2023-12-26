const express = require("express");
const app = express();
const PORT = 3000;
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
const config = require('./config');

app.use(bodyParser.json());
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
  });
app.use(userRouter);
app.use(taskRouter);

app.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user){
        res.sendStatus(401);
        return;
    }
    if (!(await bcrypt.compare(password, user.password))){
        res.sendStatus(401);
        return;
    }
  
   return res.json({
      token: jwt.sign(
        {
          userId: user.id,
        },
        config.JWT_SECRET,
        {
          expiresIn: "2 days",
        }
      ),
    });
  });
