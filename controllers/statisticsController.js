// In controllers/statisticsController.js
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";

import { User } from "../models/userSchema.js"; // Update the path if necessary
import { Job } from "../models/jobSchema.js";   // Update the path if necessary

export const getStatistics = catchAsyncErrors(async (req, res, next) => {
  try {
    const jobSeekersCount = await User.countDocuments({ role: 'Job Seeker' });
    const employersCount = await User.countDocuments({ role: 'Employer' });
    const liveInternshipsCount = await Job.countDocuments({ expired: false });

    res.status(200).json({
      success: true,
      data: {
        jobSeekers: jobSeekersCount,
        employers: employersCount,
        liveInternships: liveInternshipsCount
      }
    });
  } catch (error) {
    next(new ErrorHandler("Failed to fetch statistics.", 500));
  }
});
