# Simple Event Logger Service

## Initialize Database

Create a database file:

```bash
sqlite3 db.sqlite
```

Then create the table in the SQLite CLI:

```sql
create table events(id integer primary key, timestamp integer not null, name text not null, memo text, deleted boolean);
```

## Build and Run

Use the following command to build and launch the Express server. The port is hardcoded to 3000 at the moment.

```bash
npx tsc && node ./dist/index.js
```

## Database Cleanup

Use the following command to remove rows that were soft deleted:

```sql
delete from events where deleted=true;
```
