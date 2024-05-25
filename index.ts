import express = require("express");
import { Database } from "sqlite3";
import cors = require("cors");

type Event = {
  timestamp: number;
  name: string;
  memo: string;
};

type EventWithId = { id: number } & Event;

const db = new Database("db.sqlite");
const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/v1/events", (_req, res) => {
  db.all(
    "select id, timestamp, name, memo from events where deleted is null;",
    function (err, rows) {
      if (err) {
        res.status(500).send("Error retrieving data from database.");
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

app.post("/v1/events", (req, res) => {
  const event: Event = req.body;
  db.run(
    "insert into events(timestamp, name, memo) values(?, ?, ?);",
    [event.timestamp, event.name, event.memo],
    function (err) {
      if (err) {
        res.status(500).send("Error inserting data into database.");
      } else {
        const insertedEvent: EventWithId = {
          id: this.lastID,
          ...event,
        };
        res.status(200).json(insertedEvent);
      }
    }
  );
});

app.delete("/v1/events/:id", (req, res) => {
  db.run(
    "update events set deleted=true where id=?;",
    [req.params.id],
    function (err) {
      if (err) {
        res.status(500).send("Error deleting data from database.");
      } else {
        res.status(200).send();
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
