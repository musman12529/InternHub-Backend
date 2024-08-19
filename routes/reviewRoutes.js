import express from "express";
import {
  deleteReview,
  getAllReviews,
  getSingleReview,
  postReview,
  updateReview,
} from "../controllers/reviewController.js";


const router = express.Router();

router.get("/getall", getAllReviews);
router.post("/post",  postReview);
router.put("/update/:id",  updateReview);
router.delete("/delete/:id",  deleteReview);
router.get("/:id",  getSingleReview);

export default router;
