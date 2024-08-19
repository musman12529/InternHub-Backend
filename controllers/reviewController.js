import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { review as Review } from "../models/reviewSchema.js";
import ErrorHandler from "../middlewares/error.js";

// Get all reviews
export const getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    success: true,
    reviews,
  });
});

// Post a review
export const postReview = catchAsyncErrors(async (req, res, next) => {
  const { Company, Rating, Review: ReviewText } = req.body;

  if (!Company || !Rating || !ReviewText) {
    return next(new ErrorHandler("Please provide all required fields.", 400));
  }

  const review = await Review.create({
    Company,
    Rating,
    Review: ReviewText,
  });

  res.status(200).json({
    success: true,
    message: "Review Posted Successfully!",
    review,
  });
});

// Get a single review by ID
export const getSingleReview = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findById(id);

  if (!review) {
    return next(new ErrorHandler("Review not found.", 404));
  }

  res.status(200).json({
    success: true,
    review,
  });
});

// Delete a review by ID
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findById(id);

  if (!review) {
    return next(new ErrorHandler("Review not found.", 404));
  }

  await review.deleteOne();

  res.status(200).json({
    success: true,
    message: "Review Deleted!",
  });
});

// Update a review by ID
export const updateReview = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let review = await Review.findById(id);

  if (!review) {
    return next(new ErrorHandler("Review not found.", 404));
  }

  review = await Review.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Review Updated!",
    review,
  });
});
