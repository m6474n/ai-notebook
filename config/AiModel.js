import { GoogleGenerativeAI } from "@google/generative-ai";

  
  const apiKey = "AIzaSyBLsERv8lYwPi0NQHW7kj9FLISlBlQ8rww";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  
   export const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());

  
