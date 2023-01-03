const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
app.use(express.json());

const dbPath = path.join(__dirname, "moviesData.db");
let db = null;
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

initializeDbAndServer();

//API-1
app.get("/movies/", async (request, response) => {
  const sqlQuery = `SELECT * FROM movie`;
  const result = await db.all(sqlQuery);
  response.send(result);
});

//API-2
app.post("/movies/", async (request, response) => {
  const details = request.body;
  const { director_id, movie_name, lead_actor } = details;
  const sqlQuery = `INSERT INTO movie(director_id, movie_name, lead_actor) VALUES('${director_id}','${movie_name}','${leader_actor}')`;
  const result = await db.run(sqlQuery);
  const movie_id = result.lastID;
  response.send({ movie_id: movie_id });
});

module.exports = app;
