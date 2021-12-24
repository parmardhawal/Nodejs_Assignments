const jwt = require("jsonwebtoken");

module.exports = (req,res,next) =>{
    const token = req.cookies["jwt_token"];

    if(!token)
    {
        return res.status(401).json({message:"Access denied",status:false});
    }

    try
    {
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch(err)
    {
        return res.status(401).json({message:"Invalid token...",status:false});
    }
}