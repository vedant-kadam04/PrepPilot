const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const evaluateAnswer = async (question, answer) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: `
You are an interview evaluator.

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer and return ONLY valid JSON in this exact format:

{
  "score": 8,
  "feedback": "Short feedback",
  "improvement": "Short improvement suggestion"
}

Rules:
- score must be an integer between 1 and 10
- Return ONLY JSON
- Do not use markdown
- Do not use \`\`\`
- Do not add any explanation outside the JSON
`,
      },
    ],
  });

  return completion.choices[0].message.content;
};

module.exports = {
  evaluateAnswer,
};