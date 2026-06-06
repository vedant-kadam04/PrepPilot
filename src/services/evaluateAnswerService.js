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

Evaluate the answer and return ONLY in this format:

Score: <number out of 10>

Feedback:
<one short paragraph>

Improvement:
<one short paragraph>
        `,
      },
    ],
  });

  return completion.choices[0].message.content;
};

module.exports = {
  evaluateAnswer,
};