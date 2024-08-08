import bcrypt from "bcrypt";
import UserDetails from "../model/userModel.js";
import jwt from "jsonwebtoken";
export const createAccount = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return;
    }
    const existingEmail = await UserDetails.findOne({ email });
    if (existingEmail) {
      res.status(409).send("The email already exists");
    }

    const hashPassword = await bcrypt.hash(password, 7);

    let newUser = new UserDetails({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).send("Successfully created the account");
  } catch (error) {
    res.status(500).send("Please try again later");
    console.log(error);
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  const emailExists = await UserDetails.findOne({ email });
  try {
    if (!emailExists) {
      res.status(404).send("User not found");
    } else {
      const confirmation = await bcrypt.compare(password, emailExists.password);
      if (confirmation) {
        const token = jwt.sign(emailExists.toObject(), process.env.SECRET_KEY, {
          expiresIn: "24hr",
        });
        res.status(200).json(token);
      } else {
        res.status(404).send("Incorrect Information");
      }
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
    console.log(error);
  }
};

export const verifyToken = async (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1]; // Fix typo: spilt -> split
  if (!token) {
    return res.status(401).json({ message: "Authentication missing" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Invalid Token" });
    }

    req.body.user = user;
    next();
  });
};
