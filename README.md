# Simple Event Logger Service

Simple Event Logger is a web application for logging events. Currently, it supports logging the date time, name, and memo of an event. The intended use case is for a single user to deploy it in a private network.

Simple Event Logger is mostly a toy and study project. The bare minimum functionality is here, but it is still under development.

This repo is the backend code for Simple Event Logger. The front code is located at [simple-event-logger-ui](https://github.com/zzpxyx/simple-event-logger-ui).

## Features

- Use SQLite database.
- Provide RESTful APIs.

## Limitations and Areas for Improvement

- No authentication or access control.
- Only allow a single user.
- No unit tests.
- No linter.
- No RESTful API documentation.

## Build and Run

### Environment Requirements

The development is done and tested on Node.js v22, but recent Node.js LTS versions should also work. See below on how to run it on Node.js v12 for fun.

### First Time Only Setup

Install npm dependencies first:

```bash
npm install
```

Make sure that you have SQLite installed. You may want to use the package manager on your operating system, or check out the download page on the [official website](https://www.sqlite.org/download.html).

Then create a database file at the project root folder:

```bash
sqlite3 db.sqlite
```

Finally, create the table in the SQLite CLI:

```sql
create table events(id integer primary key, timestamp integer not null, name text not null, memo text, deleted boolean);
```

### Launch

If there are changes in `package.json`, use `npm install` to make sure that the dependencies are up-to-date.

Use the following command to build and launch the Express server. The port is hardcoded to `3000` at the moment.

```bash
npx tsc && node ./dist/index.js
```

## Database Cleanup

Usually this isn't required, but you can use the following command in the SQLite CLI to remove rows that were soft deleted:

```sql
delete from events where deleted=true;
```

## Run in Android 6 Termux

Why? Well, [just for fun](https://www.zzpxyx.com/posts/repurposing-an-old-android-phone/).

Check out the `android-6` branch. The major difference there is using TypeScript v4.9.5 as that's the last version working on Node.js v12 (the LTS version provided in Android 6's Termux).

Also note that the `sqlite3` package will be [built from the source](https://www.npmjs.com/package/sqlite3#source-install) during `npm install`. Install missing build tools like `python`, `make`, and `clang` according to the error messages. The build will take a long time, like 10 minutes.

If the `sqlite3` packages builds fine but crashes after launching the service, try rebuild it with `libsqlite`:

```
npm install sqlite3 --build-from-source --sqlite=/usr/lib
```

Remember to change the `--sqlite` to point to your `libsqlite`. `libsqlite` should already be installed when you set up SQLite.
