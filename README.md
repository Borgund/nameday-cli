# Navnedag CLI

A command-line interface tool for Norwegian namedays (navnedager). This CLI allows you to search for namedays, check today's nameday, and list all namedays in the database.

## Features

- 🔍 **Search namedays** by month and/or day
- 📅 **Today's nameday** - quickly check what names are celebrated today
- 📋 **List all namedays** - view the complete database of Norwegian namedays
- ⚡ **Fast execution** - built with Bun for optimal performance
- 🗄️ **SQLite database** - local storage with Norwegian nameday data

## Installation

### Prerequisites

- [Bun](https://bun.sh) runtime (v1.2.10 or higher)

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd navnedag-cli
```

2. Install dependencies:
```bash
bun install
```

3. Link the CLI for development:
```bash
bun link
bun link navnedag-cli
```

## Usage

### Global Usage (after linking)
```bash
bunx navnedag <command> [options]
```

### Local Development
```bash
bun run src/index.ts <command> [options]
```

## Commands

### `today`
Get today's nameday(s).

```bash
bunx navnedag today
```

**Output:** Displays the names celebrated today.

### `search`
Search for namedays by month and/or day.

```bash
bunx navnedag search [options]
```

**Options:**
- `--month, -m <number>` - Filter by month (1-12)
- `--day, -d <number>` - Filter by day (1-31)

**Examples:**
```bash
# Search for namedays in March
bunx navnedag search --month 3

# Search for namedays on March 15th
bunx navnedag search --month 3 --day 15

# Search for today's namedays (default behavior)
bunx navnedag search
```

### `list`
List all namedays in the database.

```bash
bunx navnedag list
```

**Output:** Displays all names with their corresponding dates in the format `Name (day/month)`.

## Development

### Project Structure
```
navnedag-cli/
├── src/
│   ├── index.ts      # CLI entry point
│   ├── command.ts    # Command definitions
│   ├── db.ts         # Database operations
│   └── init.ts       # Initialization logic
├── navnedag.db       # SQLite database with nameday data
├── package.json      # Project configuration
└── README.md         # This file
```

### Available Scripts

- `bun run build` - Build the project for distribution
- `bun run dev` - Run in development mode with watch
- `bun run publish` - Build and publish the package

### Database

The CLI uses a local SQLite database (`navnedag.db`) containing Norwegian nameday data. The database schema:

```sql
CREATE TABLE navnedager (
  name TEXT PRIMARY KEY,
  month INTEGER,
  day INTEGER
);
```
