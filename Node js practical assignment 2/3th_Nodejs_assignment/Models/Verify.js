const jwt = require("jsonwebtoken");
module.exports = (req,res,next)=>{

    const token = req.session.token;
    

    if(!token)
    {
        return res.redirect("/user/login");
    }
    
    try
    {
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch(err)
    {
        
        console.log("Error from Verify.js"+ err +"");
        return res.redirect("/user/login");
    }
}