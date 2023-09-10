const jwt = require("jsonwebtoken");
const keysecret = "jklknhgfdreswercfghbnjhkilmnjhg";
const userdb=require("../Model/userSchema");


const authentication = async (req, res, next) => {
          try {
                    const token = await req.headers.authorization;
                    // console.log(token);

                    if (!token) {
                              return res.status(401).json({
                                        error: "Not found token"
                              })
                    } else {
                              const verifyToken=await jwt.verify(token, keysecret);

                              if(!verifyToken){
                                        return  res.status(502).send('Invalid Token');
                              }else{
                                        // console.log("verify");
                                        const getData=await userdb.findOne({_id:verifyToken._id});

                                        if(!getData){
                                                  return   res.status(306).send('User not Found')
                                        }else{
                                                  console.log(getData);
                                        }
                              }
                    }
          } catch (error) {
                    res.status(422).json({
                              error: "Authentiction internal error"
                    })
          }
}

module.exports = authentication;