import { Database } from "bun:sqlite";

const db = new Database("navnedag.db");

createTable();

function createTable() {
  db.prepare(
    "CREATE TABLE IF NOT EXISTS navnedager (name TEXT PRIMARY KEY, month INTEGER, day INTEGER)"
  ).run();
}

export function insertNameday(name: string, month: number, day: number) {
  db.prepare("INSERT INTO navnedager (name, month, day) VALUES (?, ?, ?)").run(
    name,
    month,
    day
  );
}

export function getNamedays(): { name: string; day: number; month: number }[] {
  return db
    .prepare("SELECT * FROM navnedager GROUP BY month, day, name")
    .all() as { name: string; day: number; month: number }[];
}

export function searchNamedays(name: string): {
  name: string;
  day: number;
  month: number;
}[] {
  return db.prepare("SELECT * FROM navnedager WHERE name LIKE ?").all(name) as {
    name: string;
    day: number;
    month: number;
  }[];
}

export function getNamedaysForDate(
  month?: number,
  day?: number
): { name: string; month: number; day: number }[] {
  if (month && day) {
    return db
      .prepare(
        "SELECT name, month, day FROM navnedager WHERE month = ? AND day = ?"
      )
      .all(month, day) as { name: string; month: number; day: number }[];
  }

  if (month && !day) {
    return db
      .prepare("SELECT name, month, day FROM navnedager WHERE month = ?")
      .all(month) as { name: string; month: number; day: number }[];
  }

  return [];
}
