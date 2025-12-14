// // const JWT = require('jsonwebtoken')

// // module.exports = async(req,res,next) => {
// //     try {
// //         const token = req.headers["authorization"].split(" ")[1]
// //         JWT.verify(token, process.env.JWT_SECRET,(err,decode)=>{
// //             if(err){
// //                 return res.status(401).send({
// //                     success:false,
// //                     message:'Un-Authorize User'
// //                 })
// //             }else{
// //                 req.body.id = decode.id;
// //                 next();
// //             }
// //         })//verify for the decrypt
// //     } catch (err) {
// //         console.log(err)
// //         res.status(500).send({
// //             success:false,
// //             message:'Error in Auth API',
// //             err
// //         })
// //     }
// // }


// const JWT = require('jsonwebtoken');

// module.exports = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization || req.headers.Authorization;

//     if (!authHeader) {
//       return res.status(401).json({
//         success: false,
//         message: "No Authorization header. Use: Authorization: Bearer <token>"
//       });
//     }

//     const parts = authHeader.split(' ');
//     if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid Authorization header format. Use: Bearer <token>"
//       });
//     }

//     const token = parts[1].trim();
//     if (!token) {
//       return res.status(401).json({ success: false, message: "Token not found" });
//     }

//     if (!process.env.JWT_SECRET) {
//       console.error("JWT_SECRET is not defined!");
//       return res.status(500).json({ success: false, message: "Server config error" });
//     }

//     JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         console.error("JWT verify error:", err.message);
//         return res.status(401).json({
//           success: false,
//           message: "Invalid or expired token",
//           error: err.message
//         });
//       }
//       req.body = decoded ;
//       // req.body.id = decode.id;
//       next();
//     });
//   } catch (err) {
//     console.error("Unexpected error in auth middleware:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Error in Auth API",
//       error: err.message
//     });
//   }
// };




const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No Authorization header. Use: Authorization: Bearer <token>" });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
      return res.status(401).json({ success: false, message: "Invalid Authorization header format. Use: Bearer <token>" });
    }

    const token = parts[1].trim();
    if (!token) {
      return res.status(401).json({ success: false, message: "Token not found" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined!");
      return res.status(500).json({ success: false, message: "Server config error" });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT verify error:", err.message);
        return res.status(401).json({ success: false, message: "Invalid or expired token", error: err.message });
      }

      // Attach decoded token to req.user (DO NOT overwrite req.body)
      req.user = decoded;          // full payload like { id, email, role, ... }
      req.userId = decoded.id;     // convenience field
      next();
    });
  } catch (err) {
    console.error("Unexpected error in auth middleware:", err);
    return res.status(500).json({ success: false, message: "Error in Auth API", error: err.message });
  }
};
