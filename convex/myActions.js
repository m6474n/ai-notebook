"use node";

import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splittedText:v.any(),
    fileId: v.string(),
  },
  handler: async (ctx,args) => {
    await ConvexVectorStore.fromTexts(
      args.splittedText,  //Array
      args.fileId, // String
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyBLsERv8lYwPi0NQHW7kj9FLISlBlQ8rww",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
  },
});