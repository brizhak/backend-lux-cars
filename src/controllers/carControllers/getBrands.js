import {Car} from "../../models/index.js";
import {HttpError} from "../../helpers/index.js";

const getBrands = async (req, res) => {
    const makes = await Car.distinct("make");

    if(makes) {
        res.json(makes)
    } else {
        throw HttpError(404, 'Brands not found')
    }

}

export default getBrands;