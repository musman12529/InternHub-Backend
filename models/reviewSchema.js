import mongoose from "mongoose";



const reviewSchema = new mongoose.Schema({
    Company: {
      type: String,
      required: [true, "Please provide a company name."],
      
    },

    Rating: {
      type: Number,
      required: [true, "Please provide Rating."],
      
    },
    Review: {
      type: String,
      required: [true, "Please provide a review."],
    },
    
  });
  
  export const review = mongoose.model("review", reviewSchema);
  