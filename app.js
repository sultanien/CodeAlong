import express from "express";
import movieRoutes from "./routes/movies.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/movies", movieRoutes);
app.get('/', (req, res) => res.send('Hello from Homepage.'));

export default app