import { RequestHandler } from "express";
import ColorAnimal from "../models/color-animal.model";

const addColorAnimal: RequestHandler = (req, res, next) => {
  try {
    const colorAnimal = new ColorAnimal(req.body);
    if (colorAnimal.addRequestNotValid()) {
      return res.status(400).send({ requestIsValid: false });
    }
    colorAnimal.add();
    res.status(200).send({ colorsAndAnimalsCreated: true });
  } catch (error) {
    next(error);
  }
};

const editColorsAndAnimals: RequestHandler = (req, res, next) => {
  try {
    const colorAnimal = new ColorAnimal(req.body);
    if (colorAnimal.editRequestNotValid()) {
      return res.status(400).send({ requestIsValid: false });
    }
    colorAnimal.edit();
    res.status(200).send({ colorsAndAnimalsEdited: true });
  } catch (error) {
    next(error);
  }
};
const deleteColorsAndAnimals : RequestHandler = (req, res, next) => {
    try{
        const colorAnimal = new ColorAnimal();
        colorAnimal.delete(req.body.uuids);
        res.status(200).send({colorsAndAnimalsDeleted: true})
    }catch(error){
        next(error);
    }
}
const getAllColorsAndAnimals: RequestHandler = (_, res, next) => {
  try {
    const colorAnimal = new ColorAnimal();
    const allColorsAnimals = colorAnimal.getAll();
    if (allColorsAnimals.length > 0) {
      return res.status(200).send(allColorsAnimals);
    }
    res.status(200).send({ colorsAndAnimals: 0 });
  } catch (error) {
    next(error);
  }
};

const getRandomColorsAndAnimals: RequestHandler = (_, res, next) => {
  const colorAnimal = new ColorAnimal();
  const randomColorAnimals = colorAnimal.getRandom();
  if (randomColorAnimals.length >= 1) {
    return res.status(200).send(randomColorAnimals);
  }
  res.status(200).send({ colorsAndAnimals: 0 });
};

export default {
  addColorAnimal,
  getAllColorsAndAnimals,
  getRandomColorsAndAnimals,
  editColorsAndAnimals,
  deleteColorsAndAnimals
};
