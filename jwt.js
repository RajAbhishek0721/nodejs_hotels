const jwt=require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{
    // first check reuest header is authorization or not
    const authorization=req.headers.authorization
    if(!authorization) return res.status(401).json({error: 'Token Not Found'});

    // extract the jwt token from the request header
    const token=req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error: 'Unauthorized'});
    }
    try{
        // verofy the jwt token
        const decodedPayload = jwt.verify(token,process.env.JWT_SECRET);

        //Attach user information to the request object
        req.user=decodedPayload;
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({error : 'Invalid token'});
        
    }
}


//function to generate token
const generateToken =(userData)=>{
  return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:'1h'});
}

module.exports={jwtAuthMiddleware,generateToken};