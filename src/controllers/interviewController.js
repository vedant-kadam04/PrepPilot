const prisma = require("../config/db");


const {
  generateQuestions,
}=require("../services/geminiService");

const createInterview = async (req, res) => {
  try {
    const { title, role, difficulty } = req.body;

    const interview = await prisma.interview.create({
      data: {
        title,
        role,
        difficulty,
        userId: req.user.id,
      },
    });

    res.status(201).json(interview);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getInterviews = async (req, res) => {
  try {
    const interviews = await prisma.interview.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(interviews);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getInterviewById = async (req, res) => {
  try {
    const interview = await prisma.interview.findFirst({
      where: {
        id: parseInt(req.params.id),
        userId: req.user.id,
      },
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    res.status(200).json(interview);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteInterview = async (req, res) => {
  try {
    const interview = await prisma.interview.findFirst({
      where: {
        id: parseInt(req.params.id),
        userId: req.user.id,
      },
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    await prisma.interview.delete({
      where: {
        id: interview.id,
      },
    });

    res.status(200).json({
      message: "Interview deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const generateInterviewQuestions =  async(req,res)=>{
  try{
    const { role,difficulty}=req.body;

    const questions= await generateQuestions(
      role,
      difficulty
    );

    res.status(200).json({
      questions,
    });

  } catch(error){
    res.status(500).json({
      message:error.message,
    });
  }
};

module.exports = {
  createInterview,
  getInterviews,
  getInterviewById,
  deleteInterview,
  generateInterviewQuestions,
};