import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";

import { Giveaway } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";

export const loginUser = (email: string, password: string): void => {
  const user = programData.users.find(
    (user) => user.email === email && user.password === password
  );

  if (user?.email === email && user.password === password) {
    programData.userEmail = email;
    programData.isAdmin = user.isAdmin;
  } else {
    console.log("Error, el usuario no existe");
    process.exit();
  }
};

export const createGiveaway = (): void => {
  const NewGiveaway = askUserNewGiveawayData();

  const NewGiveawayAdjustedType = {
    name: NewGiveaway.giveawayName,
    socialNetwork: NewGiveaway.giveawaySocialNetwork,
    participants: [],
  };

  programData.giveaways.push(NewGiveawayAdjustedType);
  saveData();

  console.log("Nuevo sorteo creado");
};

export const listGiveaways = () => {
  const giveaways = programData.giveaways;

  if (giveaways.length === 0) {
    console.log("No hay sorteos disponibles");
    return;
  }

  console.log(`Éstos son los ${giveaways.length} sorteos disponibles:`);

  giveaways.forEach((giveaway, index) => {
    console.log(`${index + 1}. ${giveaway.name} en ${giveaway.socialNetwork}`);
  });
};

export const deleteGiveaway = (giveawayNumber: number): void => {
  if (giveawayNumber < 1 || giveawayNumber > programData.giveaways.length) {
    console.log("No existen sorteos en es posición");
  }

  programData.giveaways.splice(giveawayNumber - 1, giveawayNumber);

  console.log("Sorteo eliminado con éxito");
};
