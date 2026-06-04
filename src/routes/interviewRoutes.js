const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createInterview,
  getInterviews,
  getInterviewById,
  deleteInterview,
  generateInterviewQuestions,
} = require("../controllers/interviewController");

router.post("/", protect, createInterview);
router.get("/", protect, getInterviews);
router.get("/:id", protect, getInterviewById);
router.delete("/:id", protect, deleteInterview);
router.post(
  "/generate-questions",
   protect,
   generateInterviewQuestions
);
module.exports = router;