import {Car} from "../../models/index.js";
import {HttpError} from "../../helpers/index.js";

const getAllCars = async (req, res) => {
    const { page = 1, limit = 12 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Car.find({}, "-createdAt -updatedAt", {
      skip,
      limit,
    });

    if (!result.length) {
      throw HttpError(404, 'No list of available cars was found.');
    }
  
    res.json(result);
  };

export default getAllCars;
