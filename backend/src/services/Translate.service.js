require('dotenv').config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const translateMessage = async (content, targetLanguage) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `Traduce el siguiente mensaje a ${targetLanguage}` },
        { role: 'user', content },
      ],
    });

    // Devuelve el contenido traducido
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error al traducir el mensaje:', error.message);
    throw new Error('Error al intentar traducir el mensaje');
  }
};

module.exports = { translateMessage }