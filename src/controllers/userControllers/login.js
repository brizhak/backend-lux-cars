import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { User } from '../../models/index.js';
import {HttpError} from '../../helpers/index.js';

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { email, password: plainPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw HttpError(404, "Invalid login or password.");

  const isPasswordValid = await bcrypt.compare(plainPassword, user.password);

  if (!isPasswordValid)
    throw HttpError(404, "Invalid login or password.");

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });
  
  res.json({
    token,
    user: {
      email: user.email,
      name: user.name
    },
  });
};

export default login
