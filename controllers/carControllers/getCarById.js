import {Car} from "../../models/index.js";
import {HttpError} from "../../helpers/index.js";

const getCarById = async(req, res) => {
    const { id } = req.params;
  
    const result = await Car.findOne({_id: id})
  
    if(!result) throw HttpError(404, `Car with id ${id} was not found `)
    res.json(result)
  }
  
export default getCarById;