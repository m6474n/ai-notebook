import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // tableName 
 users:defineTable({
    // column Name : value . dataType
    userName:v.string(),
    email: v.string(),
    iimageUrl: v.string(),

 })
})