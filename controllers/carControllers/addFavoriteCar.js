import { User } from '../../models/index.js';
import { HttpError } from "../../helpers/index.js";
import mongoose from 'mongoose';

const addFavoriteCar = async (req, res) => {
  const { _id } = req.user;
  const { car_id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(car_id)) {
    throw HttpError(400, 'Invalid car id');
  }

  const user = await User.findById(_id);

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  if (user.favoriteCars.includes(car_id)) {
    throw HttpError(400, 'Car already in favorites');
  }

  const result = await User.updateOne(
    { _id },
    { $addToSet: { favoriteCars: car_id } }
  );

  if (result.nModified === 0) {
    throw HttpError(404, 'Car already in favorites');
  }

  res.json({ message: 'Car added to favorites successfully' });
};

export default addFavoriteCar;