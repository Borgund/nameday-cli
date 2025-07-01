import { Clerc, defineCommand, helpPlugin } from "clerc";
import { getNamedays, getNamedaysForDate } from "./db.ts";
const list = defineCommand(
  {
    name: "list",
    description: "list all the days",
  },
  () =>
    console.log(
      formatNamedays({
        namedays: getNamedays(),
      })
    )
);

const today = defineCommand(
  {
    name: "search",
    description: "search for a nameday on a given date",
    flags: {
      month: {
        type: Number,
        alias: "m",
        description: "the month to filter by",
        default: new Date().getMonth() + 1,
      },
      day: {
        type: Number,
        alias: "d",
        description: "the day to filter by. Must be used with the month flag.",
        default: new Date().getDate(),
      },
    },
  },
  (context) => {
    console.log(
      formatNamedays({
        namedays: getNamedaysForDate(context.flags.month, context.flags.day),
        justNames: context.flags.day !== undefined,
      })
    );
  }
);

const search = defineCommand(
  {
    name: "today",
    description: "get the name of the day",
    alias: "",
  },
  (context) => {
    console.log(
      formatNamedays({
        namedays: getNamedaysForDate(
          new Date().getMonth() + 1,
          new Date().getDate()
        ),
        justNames: true,
      })
    );
  }
);

function formatNamedays({
  namedays,
  justNames = false,
}: {
  namedays: { name: string; day: number; month: number }[];
  justNames?: boolean;
}) {
  return namedays.map(
    ({ name, day, month }: { name: string; day: number; month: number }) =>
      justNames ? name : `${name} (${day}/${month})`
  );
}

Clerc.create()
  .scriptName("navnedag")
  .description("Your all in one CLI tool for Norwegian namedays")
  .version("0.0.1")
  .command(today)
  .command(list)
  .command(search)
  .use(helpPlugin())
  .parse();
