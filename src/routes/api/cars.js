import express from "express";
import {isValidId, authWrapped} from "../../middlewares/index.js";
import { getFilteredCarsWrapped, getBrandsWrapped, getAllCarsWrapped, getCarByIdWrapped, getFavoritesWrapped, addFavoriteCarWrapped, deleteFavoriteCarWrapped } from "../../controllers/carControllers/index.js";

const carsRouter = express.Router();

carsRouter.get("/", getAllCarsWrapped);

carsRouter.get("/brands", getBrandsWrapped)

carsRouter.post("/favorites", authWrapped, addFavoriteCarWrapped);

carsRouter.get('/car/:id', isValidId, getCarByIdWrapped)

carsRouter.get('/filters', getFilteredCarsWrapped)

carsRouter.get('/favorites', authWrapped, getFavoritesWrapped)

carsRouter.delete('/favorites', authWrapped, deleteFavoriteCarWrapped)

export default carsRouter;