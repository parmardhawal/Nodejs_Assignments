const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){
    try{
        const token = req.header("auth-token");
        const validToken = jwt.verify(token,process.env.SECRET_TOKEN);

        if(!validToken) return res.status(401).json({message:"Access denied",status:false});

        req.user = validToken;

        next();


    }catch(err)
    {
        res.status(401).json({message:"Invalid Token",status:false})
    }
}

