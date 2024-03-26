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

export const listGiveaways = (): void => {
  const giveaways = programData.giveaways;

  if (giveaways.length === 0) {
    console.log("No hay sorteos disponibles.");
  }
};
