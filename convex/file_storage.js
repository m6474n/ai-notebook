import { mutation, query } from "./_generated/server";
import { v } from "convex/values";  // Assuming you have `convex/values` for validation

// Mutation to generate an upload URL
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const AddFileToDB = mutation({
  args: {
    fileId: v.string(),
    fileName: v.string(),
    storageId: v.string(),
    fileURL: v.string(),
    createdBy: v.string(), 
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("files", {
      fileId: args.fileId,
      fileName: args.fileName,
      storageId: args.storageId,
      fileURL: args.fileURL,
      createdBy: args.createdBy, 
    });

    return  "File added to DB successfully!";
  },
});

export const getFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return url; 
  },
});

export const GetFileRecord = query({
  args:{
    fileId:v.string(),
  },handler:async(ctx,args)=>{
   const result= await ctx.db.query('files').filter((q)=>q.eq(q.field('fileId'), args.fileId)).collect();
    console.log(result);
    return result[0];
  }
})

export const getUserFiles = query({
  args:{
    createdBy: v.optional(v.string()),
  },handler:async(ctx, args)=>{

    if(!args?.createdBy){
      return ;
    }

    const result = await ctx.db
    .query("files")
    .filter((q) => q.eq(q.field("createdBy"), args.createdBy))
    .collect();
    return result;
 
  }
})