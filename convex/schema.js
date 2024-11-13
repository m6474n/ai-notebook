import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // tableName 
 users:defineTable({
    // column Name : value . dataType
    userName:v.string(),
    email: v.string(),
    imageUrl: v.string(),

 }),
 files:defineTable({
    fileId:v.string(),
    fileName:v.string(),
    storageId:v.string(),
    fileURL:v.string(),
    createdBy:v.string(),
 })
 , documents: defineTable({
    embedding: v.array(v.number()),
    text: v.string(),
    metadata: v.any(),
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding",
    dimensions: 768,
  }),
})