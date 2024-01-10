import {HttpError} from '../../helpers/index.js';
import { User } from '../../models/index.js';
import {Car} from '../../models/index.js'

const getFavorites = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id);

  if (!user) {
    throw HttpError(404, "User not found" );
  }
  const favoriteCars = await Car.find({ _id: { $in: user.favoriteCars } });

  res.json({ favoriteCars });

};

export default getFavorites;