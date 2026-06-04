const generateQuestions = async (role, difficulty) => {
  return [
    `Tell me about yourself.`,
    `Why do you want to work as a ${role}?`,
    `What projects have you worked on?`,
    `Explain Object-Oriented Programming.`,
    `What is polymorphism?`,
    `What is inheritance?`,
    `How do you debug code?`,
    `Describe a challenging problem you solved.`,
    `What are your strengths and weaknesses?`,
    `Why should we hire you?`,
  ];
};

module.exports = {
  generateQuestions,
};