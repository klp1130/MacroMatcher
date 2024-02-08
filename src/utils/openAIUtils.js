export async function expandMacroUsingGPT4(macroPhrase, inputText) {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  // Constructing the prompt to guide GPT-4 for contextual expansion
  const detailedPrompt = `Given the following radiology transcript: "${inputText}", and the phrase following 'insert' or 'input': "${macroPhrase}", provide a detailed expansion that fits within this context.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          "role": "system",
          "content": "You are an AI trained to assist with radiology transcript processing. Provide expansions for macros."
        },
        {
          "role": "user",
          "content": detailedPrompt
        }
      ],
    }),
  });

  const data = await response.json();
  if (response.ok) {
    if (data.choices && data.choices.length > 0) {
      // Extracting the content from the GPT-4 response
      return data.choices[0].message.content.trim();
    } else {
      throw new Error('No choices found in the response from the OpenAI API');
    }
  } else {
    // Handle HTTP errors
    throw new Error(`Failed to get a response from the OpenAI API: ${data.error?.message || response.status}`);
  }
}
