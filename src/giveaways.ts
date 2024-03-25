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
