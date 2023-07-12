import BlogModel from "../../../models/blog";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  try {

    var page = req.query.page || 1
    var limit = req.query.limit || 10
    var skip = (page - 1) * limit

    var match = {}

    req.query.category && (match.category = req.query.category)
    req.query.keyword && (match.title = new RegExp(req.query.keyword,"i"))



    const blogs = await BlogModel.find(match,{desc:0,metaDesc:0}).limit(limit).skip(skip).sort({createdAt:-1})
    const count = await BlogModel.find(match).count()


    res.status(200).json({
      success: true,
      count,
      blogs,
    });
  } catch (err) {
    console.log(err + "something Went Wrong");
  }
}

// API ROUTE
// http://localhost:3000/api/get-all-posts
