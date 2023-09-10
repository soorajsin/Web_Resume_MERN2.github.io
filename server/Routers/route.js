const express = require("express");
const router = new express.Router();
const userdb = require("../Model/userSchema");
const bcrypt = require("bcryptjs");


router.post("/register", async (req, res) => {
          // console.log(req.body);
          try {
                    const {
                              name,
                              email,
                              password,
                              cpassword
                    } = req.body;

                    if (!name || !email || !password || !cpassword) {
                              return res.status(400).json({
                                        msg: "Please enter all fields"
                              });
                    } else {
                              const preUser = await userdb.findOne({
                                        email
                              });

                              if (preUser) {
                                        res.status(201).json({
                                                  status: 201,
                                                  error: "User ALready Exist"
                                        })
                              } else {
                                        const userData = new userdb({
                                                  name,
                                                  email,
                                                  password,
                                                  cpassword
                                        });

                                        const saveData = await userData.save();

                                        res.status(201).json({
                                                  status: 202,
                                                  message: "User Registration done",
                                                  userData: saveData
                                        })
                              }
                    }

          } catch (error) {
                    res.status(422).json({
                              error: "User not register"
                    })
          }
});



router.post("/login", async (req, res) => {
          // console.log(req.body);
          try {
                    const {
                              email,
                              password
                    } = req.body;

                    if (!email || !password) {
                              throw Error("Enter Email and Password");
                    } else {
                              const preUser = await userdb.findOne({
                                        email
                              });

                              if (!preUser) {
                                        res.status(422).json({
                                                  status: 204,
                                                  error: "Email Not Found"
                                        })
                              } else {
                                        const isMatchPassword = await bcrypt.compare(password, preUser.password);

                                        if (!isMatchPassword) {
                                                  res.status(422).json({
                                                            status: 205,
                                                            error: "Password Not Match"
                                                  })
                                        } else {
                                                  // console.log("done");

                                                  const token = await preUser.getSignedToken();
                                                  // console.log(token);


                                                  //generate cookie
                                                  res.cookie("auth_token", token, {
                                                            httpOnly: true, // Ensures the cookie is only accessible on the server
                                                            secure: true, // Ensures the cookie is only sent over HTTPS (in a production environment)
                                                            maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds (adjust as needed)
                                                  });

                                                  const result = {
                                                            preUser,
                                                            token
                                                  };


                                                  res.status(200).json({
                                                            status: 203,
                                                            message: "Login Successful",
                                                            result: result
                                                  });
                                        }
                              }
                    }

          } catch (error) {
                    res.status(422).json({
                              error: "User not login"
                    })
          }
})


module.exports = router;