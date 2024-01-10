import { User } from "../../models/index.js";
import {HttpError} from "../../helpers/index.js";

const deleteFavoriteCar = async (req, res) => {
  const { _id } = req.user;
  const { car_id } = req.body;

  const user = await User.findById(_id);

  if (!user) {
    throw HttpError(404, "User not found" );
  }

  const initialFavoriteCarsCount = user.favoriteCars.length;

  user.favoriteCars.pull(car_id);

  await user.save();

  const updatedUser = await User.findById(_id);

  if (updatedUser.favoriteCars.length < initialFavoriteCarsCount) {
    return res.json({ message: "Car deleted from favorites successfully" });
  } else {
    throw HttpError(404,"Car not found in favorites" );
  }
};

export default deleteFavoriteCar;
