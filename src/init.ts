import { getNamedays, insertNameday } from "./db";

export async function fetchNamedays() {
  return (await fetch("https://nameday.borgund.dev")).json();
}

export async function init() {
  if (getNamedays().length > 0) {
    return;
  }

  const namedays: { name: string; month: number; day: number }[] =
    (await fetchNamedays()) as [{ name: string; month: number; day: number }];

  for (const nameday of namedays) {
    insertNameday(nameday.name, nameday.month, nameday.day);
  }

  console.log("Initialized the database");
}
