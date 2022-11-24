import express from "express";
import {
  getMovies,
  createMovie,
  getMovieById,
  deleteMovieById,
  updateMovieById,
} from "../controllers/controller.js";

const router = express.Router();

router.get("/", getMovies);

router.post("/", createMovie);

router.get("/:id", getMovieById);

router.delete("/:id", deleteMovieById);

router.patch("/:id", updateMovieById);

export default router;
