import {
  Clerc,
  completionsPlugin,
  defineCommand,
  friendlyErrorPlugin,
  helpPlugin,
  notFoundPlugin,
  versionPlugin,
} from "clerc";
import { getNamedays, getNamedaysForDate, searchNamedays } from "./db.ts";
const list = defineCommand(
  {
    name: "list",
    description: "list all the days",
    alias: "l",
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
    alias: "s",
    flags: {
      name: {
        type: String,
        alias: "n",
        description: "the name to filter by",
      },
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
        namedays: context.flags.name
          ? searchNamedays(context.flags.name)
          : getNamedaysForDate(context.flags.month, context.flags.day),
        justNames:
          context.flags.day !== undefined && context.flags.name === undefined,
      })
    );
  }
);

const search = defineCommand(
  {
    name: "today",
    description: "get the name of the day",
    alias: "t",
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
      justNames ? name : `${name} (${day}.${month})`
  );
}

Clerc.create()
  .scriptName("navnedag")
  .description("Your all in one CLI tool for Norwegian namedays")
  .version("0.0.3")
  .command(today)
  .command(list)
  .command(search)
  .use(helpPlugin())
  .use(friendlyErrorPlugin())
  .use(notFoundPlugin())
  .use(versionPlugin())
  .use(completionsPlugin())
  .parse();
