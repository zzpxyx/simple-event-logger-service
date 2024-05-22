import express from "express";

const port = 3000;
const app = express();

app.use(express.json());

type Event = {
  timestamp: number;
  event: string;
  memo: string;
};

const db: Event[] = [];

app.get("/v1/events", (_req, res) => {
  res.status(200).json(db);
});

app.post("/v1/events", (req, res) => {
  const event: Event = req.body;
  db.push(event);
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
