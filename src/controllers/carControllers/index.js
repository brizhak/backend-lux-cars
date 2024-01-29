import getAllCars from "./getAllCars.js";
import getBrands from "./getBrands.js";
import getCarById from "./getCarById.js";
import getFilteredCars from "./getFilteredCars.js";
import getFavorites from "./getFavorites.js";
import addFavoriteCar from './addFavoriteCar.js'
import deleteFavoriteCar from './deleteFavoriteCar.js'
import { ctrlWrapper } from "../../decorators/index.js";

export const getAllCarsWrapped = ctrlWrapper(getAllCars)
export const getBrandsWrapped = ctrlWrapper(getBrands)
export const getCarByIdWrapped = ctrlWrapper(getCarById)
export const getFilteredCarsWrapped = ctrlWrapper(getFilteredCars)
export const getFavoritesWrapped = ctrlWrapper(getFavorites)
export const addFavoriteCarWrapped = ctrlWrapper(addFavoriteCar)
export const deleteFavoriteCarWrapped = ctrlWrapper(deleteFavoriteCar)