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

export const deleteGiveaway = (giveawayToDelete: number): void => {
  if (giveawayToDelete < 1 || giveawayToDelete > programData.giveaways.length) {
    console.log("No existen sorteos en es posición");
  }

  programData.giveaways.splice(giveawayToDelete - 1, giveawayToDelete);
  saveData();
  console.log("Sorteo eliminado con éxito");
};

export const enterGiveaway = (giveawayToJoin: number): void => {
  if (giveawayToJoin < 1 || giveawayToJoin > programData.giveaways.length) {
    console.log("El sorteo indicado no existe");
    return;
  }
  const userEmail: User = {
    name: "",
    email: programData.userEmail,
    password: "",
    isAdmin: false,
  };
  programData.giveaways[giveawayToJoin - 1].participants.push(userEmail);
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
  }

  let sorteosStringSwitch = "sorteos";

  if (userGiveaways.length === 1) {
    sorteosStringSwitch = "sorteo";
  }

  console.log(
    `Estás inscrito en ${userGiveaways.length} ${sorteosStringSwitch}:`
  );
  userGiveaways.forEach((giveaway, index) => {
    console.log(`${index + 1}- ${giveaway.name} en ${giveaway.socialNetwork}`);
  });
};
