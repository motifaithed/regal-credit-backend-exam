import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
interface ColorAnimalObj {
  uuid: string;
  color: string;
  animal: string;
}

interface IColorAnimal {
  colorAnimalObj: ColorAnimalObj | ColorAnimalObj[];
  add(): void;
  getAll(): ColorAnimalObj[];
  getRandom(): ColorAnimalObj[];
  edit(): void;
  delete(ids: string[]): void;
}
class ColorAnimal implements IColorAnimal {
  constructor(public colorAnimalObj: ColorAnimalObj | ColorAnimalObj[] = []) {
    this.colorAnimalObj = colorAnimalObj;
  }
  addRequestNotValid() {
    if (this.colorAnimalObj instanceof Array) {
      for (const colAnObj of this.colorAnimalObj) {
        return (
          !colAnObj.color ||
          !colAnObj.animal ||
          colAnObj.color === "" ||
          colAnObj.animal === "" ||
          typeof colAnObj.color !== "string" ||
          typeof colAnObj.animal !== "string"
        );
      }
    } else {
      return (
        !this.colorAnimalObj.color ||
        !this.colorAnimalObj.animal ||
        this.colorAnimalObj.color === "" ||
        this.colorAnimalObj.animal === "" ||
        typeof this.colorAnimalObj.color !== "string" ||
        typeof this.colorAnimalObj.animal !== "string"
      );
    }
  }
  editRequestNotValid() {
    if (this.colorAnimalObj instanceof Array) {
      for (const colAnObj of this.colorAnimalObj) {
        return (
          !colAnObj.color ||
          !colAnObj.animal ||
          !colAnObj.uuid ||
          colAnObj.color === "" ||
          colAnObj.animal === "" ||
          colAnObj.uuid === "" ||
          typeof colAnObj.color !== "string" ||
          typeof colAnObj.animal !== "string" ||
          typeof colAnObj.uuid !== "string"
        );
      }
    } else {
      return (
        !this.colorAnimalObj.color ||
        !this.colorAnimalObj.animal ||
        !this.colorAnimalObj.uuid ||
        this.colorAnimalObj.color === "" ||
        this.colorAnimalObj.animal === "" ||
        this.colorAnimalObj.uuid === "" ||
        typeof this.colorAnimalObj.color !== "string" ||
        typeof this.colorAnimalObj.animal !== "string" ||
        typeof this.colorAnimalObj.uuid !== "string"
      );
    }
  }

  private getDataFile() {
    const filePath = path.join(__dirname, "..", "..", "data", "data.json");
    const fileData = fs.readFileSync(filePath).toString();
    return { data: JSON.parse(fileData), path: filePath };
  }
  add() {
    const existingColorsAnimals = this.getDataFile().data;
    if (this.colorAnimalObj instanceof Array) {
      for (const colAnObj of this.colorAnimalObj) {
        const newColorAnimalObj = {
          uuid: uuidv4(),
          color: colAnObj.color,
          animal: colAnObj.animal,
        };
        existingColorsAnimals.push(newColorAnimalObj);
      }
    } else {
      const newColorAnimalObj = {
        uuid: uuidv4(),
        color: this.colorAnimalObj.color,
        animal: this.colorAnimalObj.animal,
      };
      existingColorsAnimals.push(newColorAnimalObj);
    }
    fs.writeFileSync(
      this.getDataFile().path,
      JSON.stringify(existingColorsAnimals)
    );
  }
  edit() {
    const existingColorsAnimals = this.getDataFile().data;
    if (this.colorAnimalObj instanceof Array) {
      for (const colAnObj of this.colorAnimalObj) {
        for (const colorAndAnimal of existingColorsAnimals) {
          if (colorAndAnimal.uuid === colAnObj.uuid) {
            colorAndAnimal.color = colAnObj.color;
            colorAndAnimal.animal = colAnObj.animal;
            break;
          }
        }
      }
    } else {
      for (const colorAndAnimal of existingColorsAnimals) {
        if (this.colorAnimalObj.uuid === colorAndAnimal.uuid) {
          colorAndAnimal.color = this.colorAnimalObj.color;
          colorAndAnimal.animal = this.colorAnimalObj.animal;
          break;
        }
      }
    }
    fs.writeFileSync(
      this.getDataFile().path,
      JSON.stringify(existingColorsAnimals)
    );
  }
  delete(ids: string[]) {
    const existingColorsAnimals = this.getDataFile().data;
    if (ids instanceof Array) {
      for (const id of ids) {
        for (const colorAndAnimal of existingColorsAnimals) {
          if (id === colorAndAnimal.uuid) {
            existingColorsAnimals.splice(
              existingColorsAnimals.indexOf(colorAndAnimal),
              1
            );
            break;
          }
        }
      }
    }
    fs.writeFileSync(
      this.getDataFile().path,
      JSON.stringify(existingColorsAnimals)
    );
  }
  getAll() {
    const existingColorsAnimals = this.getDataFile().data;
    return existingColorsAnimals;
  }
  getRandom() {
    const existingColorsAnimals = this.getDataFile().data;
    const low = 0;
    const high = existingColorsAnimals.length - 1;

    const colorAnimal1 = Math.floor(Math.random() * (high - low + 1)) + low;
    const colorAnimal2 = Math.floor(Math.random() * (high - low - 1)) + low;
    const result: ColorAnimalObj[] = [];
    if (existingColorsAnimals.length === 1) {
      result.push(existingColorsAnimals[0]);
    } else if (existingColorsAnimals.length > 1) {
      result.push(
        existingColorsAnimals[colorAnimal1],
        existingColorsAnimals[colorAnimal2]
      );
    }
    return result;
  }
}

export default ColorAnimal;
