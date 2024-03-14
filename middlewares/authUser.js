const jwt = require("jsonwebtoken")

const verifyToken = async(req, res, next)=>{
    const token = req.body.token || req.query.token || req.headers["authorization"];
    
    if (!token) {
        res.status(200).send({
            success:false, 
            msg:"Token Required"
        })
    } else{
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode
            return next();

        } catch (error) {
            res.status(400).send({
                success:false, 
                msg:"Invalid Token"
            })
        }       
    }
}

module.exports = verifyToken;
