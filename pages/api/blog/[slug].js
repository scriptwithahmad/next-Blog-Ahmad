import dbConnect from "../../../config/dbConnect";
import BlogModel from '../../../models/blog'

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
       //-------------- GET POST --------------//
    case "GET":
      try {
        const singleBlog = await BlogModel.findOne({ slug: req.query.slug });
        res.status(200).json({
          success: true,
          singleBlog,
        });
      } catch (error) {
        console.log(error);
      }
      break;
       //-------------- UPDATE POST --------------//
    case "PUT":
      try {
        const singleBlog = await BlogModel.findOne({ slug: req.query.slug });

        if (!singleBlog) {
          res.status(404).json({
            success: false,
            message: "Blog Not Found",
          });
        } else {
          const updateBlog = await BlogModel.findByIdAndUpdate(
            singleBlog._id,
            {
              $set: {
                ...req.body,
                slug: req.body.title
                  .trim()
                  .toLowerCase()
                  .replace(/ /g, "-")
                  .replace(/[^\w-]+/g, "")
                  .replace(/--/g, "-"),
              },
            },
            { new: true }
          );
    
          res.status(200).json({
            updateBlog,
          });
        }
      } catch (error) {
        console.log(error);
      }

      break;
      //-------------- DELETE POST --------------//
      case "DELETE":
      try {
        const singleBlog = await BlogModel.findOne({ slug: req.query.slug });
        if(!singleBlog){
         res.status(404).json({
            success: false,
            message: "Blog Not Found"
         })

        }else{
            const delBlog = await BlogModel.findByIdAndDelete(singleBlog._id)
            res.status(200).json({
                success: true,
                message: "Blog Successfully Deleted"
            })
        }

      } catch (error) {
        res.status(error)
      }

      break;

    default:
      break;
  }

  try {
    const singleBlog = await BlogModel.findOne({ slug: req.query.slug });
    res.status(200).json({
      success: true,
      singleBlog,
    });
  } catch (error) {
    res.status(error);
  }
}
