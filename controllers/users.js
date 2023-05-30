const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Users  {
  constructor(model) {
    this.model = model;
  }

  async signupUser(req,res){
    try{
      const {name, email, password} = req.body;

      const existingUser = await this.model.findOne({
        where: {
          email: email,
        }
      });

      if(existingUser){
        res.status(400).json({
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name: name,
        email: email,
        password: hashedPassword,
      };

      await this.model.create(newUser);
      res.status(201).json({
        message: "User created successfully",
      });

    } catch (error){
      console.log("Signup error", error);
      res.status(500).json();
    }
  } 
  async loginUser(req, res) {
    try {
      const user = await this.model.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        return res.json({ msg: "user is not found" });
      }

      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "24 hours",
        });
        res.cookie("plopplop", token, { httpOnly: true });
        res.cookie("userId", user.id, { httpOnly: true });
        return res.json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          },
        });
      }
    } catch (error) {
      console.log("Error message: ", error);
      return res.send("Unauthorized user");
    }
  }
  
    
  
}

module.exports = Users;
