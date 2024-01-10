import {Car} from "../../models/index.js";
import {HttpError} from "../../helpers/index.js";

const getFilteredCars = async(req, res) => {
    const {make = null, rentalPriceFrom = null, rentalPriceTo = null, mileageFrom = null, mileageTo = null, yearFrom = null, yearTo = null} = req.query;
  
    const filters = {};
    // Make
    if (make !== null && make.trim() !== '' && typeof make === 'string') {
      filters.make = make.trim();
    } else if (make !== null && make.length === 0){
      throw HttpError(400, 'Wrong make value')
    }
    // rentalPrice
    if (
      (rentalPriceFrom !== null && rentalPriceFrom !== '' && !isNaN(rentalPriceFrom)) ||
      (rentalPriceTo !== null && rentalPriceTo !== '' && !isNaN(rentalPriceTo))
    ) {
  
      filters.rentalPrice = {};
  
      if (rentalPriceFrom) {
        const parsedRentalPriceFrom = Number(rentalPriceFrom);
        if (!isNaN(parsedRentalPriceFrom)) {
          filters.rentalPrice.$gte = parsedRentalPriceFrom;
        } else {
          throw HttpError(400, 'Wrong rentalPriceFrom value');
        }
      }
    
      if (rentalPriceTo) {
        const parsedRentalPriceTo = Number(rentalPriceTo);
        if (!isNaN(parsedRentalPriceTo)) {
          filters.rentalPrice.$lte = parsedRentalPriceTo;
        } else {
          throw HttpError(400, 'Wrong rentalPriceTo value');
        }
      }
    } else if ((rentalPriceFrom === '' || isNaN(rentalPriceFrom)) ||
    (rentalPriceTo === '' || isNaN(rentalPriceTo))){
      console.log(rentalPriceFrom)
      throw HttpError(400, 'Wrong rentalPrice value');
    }
  
    // Mileage
  
    if (
      (mileageFrom !== null && mileageFrom !== '' && !isNaN(mileageFrom)) ||
      (mileageTo !== null && mileageTo !== '' && !isNaN(mileageTo))
    ) {
      filters.mileage = {};
    
      if (mileageFrom) {
        const parsedMileageFrom = Number(mileageFrom);
        if (!isNaN(parsedMileageFrom)) {
          filters.mileage.$gte = parsedMileageFrom;
        } else {
          throw HttpError(400, 'Wrong mileageFrom value');
        }
      }
    
      if (mileageTo) {
        const parsedMileageTo = Number(mileageTo);
        if (!isNaN(parsedMileageTo)) {
          filters.mileage.$lte = parsedMileageTo;
        } else {
          throw HttpError(400, 'Wrong mileageTo value');
        }
      }
    } else if ((mileageFrom === '' || isNaN(mileageFrom)) ||
    (mileageTo === '' || isNaN(mileageTo))){
      throw HttpError(400, 'Wrong mileage value');
    }
    
    // Year 
  
    if (
      (yearFrom !== null && yearFrom !== '' && !isNaN(yearFrom)) ||
      (yearTo !== null && yearTo !== '' && !isNaN(yearTo))
    ) {
      filters.year = {};
  
      const currentYear = new Date().getFullYear()
  
      if (yearFrom) {
        const parsedYearFrom = Number(yearFrom);
        if (!isNaN(parsedYearFrom) && parsedYearFrom <= currentYear) {
          filters.year.$gte = parsedYearFrom;
        } else {
          throw HttpError(400, 'Wrong yearFrom value');
        }
      }
    
      if (yearTo) {
        const parsedYearTo = Number(yearTo);
        if (!isNaN(parsedYearTo) && parsedYearTo <= currentYear ) {
          filters.year.$lte = parsedYearTo;
        } else {
          throw HttpError(400, 'Wrong yearTo value');
        }
      }
    } else if (( yearFrom === '' || isNaN(yearFrom)) ||
    ( yearTo === '' || isNaN(yearTo))){
      throw HttpError(400, 'Wrong year value');
    }
  
    const result = await Car.find(filters);
  
    if(!result.length) {
      throw HttpError(404, 'Nothing was found for your request.')
    }
  
    res.json(result)
  }

export default getFilteredCars;