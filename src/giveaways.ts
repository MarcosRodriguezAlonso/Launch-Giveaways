import { userInfo } from "os";
import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";

import { Giveaway, User } from "./types.js";
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

  saveData();
};

export const createGiveaway = (): void => {
  const newGiveaway = askUserNewGiveawayData();

  const newGiveawayAdjustedType = {
    name: newGiveaway.giveawayName,
    socialNetwork: newGiveaway.giveawaySocialNetwork,
    participants: [],
  };

  const existingGiveaway = programData.giveaways.find(
    (giveaway) =>
      giveaway.name === newGiveaway.giveawayName &&
      giveaway.socialNetwork === newGiveaway.giveawaySocialNetwork
  );

  if (existingGiveaway) {
    console.log("Ese sorteo ya existe");
    return;
  }

  programData.giveaways.push(newGiveawayAdjustedType);
  saveData();

  console.log("Nuevo sorteo creado");
};

export const listGiveaways = (): void => {
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

export const deleteGiveaway = (giveawayToDelete: number): void => {
  if (giveawayToDelete < 1 || giveawayToDelete > programData.giveaways.length) {
    console.log("No existen sorteos en esa posición");
    return;
  }

  if (programData.giveaways.splice(giveawayToDelete - 1, giveawayToDelete)) {
    saveData();
    console.log("Sorteo eliminado con éxito");
  }
};

export const enterGiveaway = (giveawayToEnter: number): void => {
  const giveaway = programData.giveaways[giveawayToEnter - 1];

  if (!giveaway) {
    console.log("El sorteo indicado no existe");
    return;
  }

  const alreadyEntered = giveaway.participants.some(
    (participant) => participant.email === programData.userEmail
  );

  if (alreadyEntered) {
    console.log("Ya estás incrito en ese sorteo");
    return;
  }

  giveaway.participants.push({
    name: "",
    email: programData.userEmail,
    password: "",
    isAdmin: false,
  });

  saveData();

  console.log("Inscrito en el sorteo con éxito");
};

export const listUserGiveaways = (): void => {
  const userEmail = programData.userEmail;
  const userGiveaways = programData.giveaways.filter((giveaway) =>
    giveaway.participants.some((participant) => participant.email === userEmail)
  );

  if (userGiveaways.length === 0) {
    console.log("No estás registrado en ningún sorteo");
    return;
  }

  console.log(
    `Estás inscrito en ${userGiveaways.length} ${
      userGiveaways.length === 1 ? "sorteo" : "sorteos"
    }:`
  );
  userGiveaways.forEach((giveaway, index) => {
    console.log(`${index + 1}- ${giveaway.name} en ${giveaway.socialNetwork}`);
  });
};
