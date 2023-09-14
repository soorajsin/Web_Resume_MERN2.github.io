const express = require("express");
const router = new express.Router();
const userdb = require("../Model/userSchema");
const bcrypt = require("bcryptjs");
const authentication = require("../Middleware/Authentication");


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
});



//validation user
router.get("/validUser", authentication, async (req, res) => {
          // console.log("done");
          // console.log(req.getData);

          if (req.getData) {
                    // console.log("done");
                    res.status(201).json({
                              status: 205,
                              message: "User Authenticate",
                              getData: req.getData
                    })

          } else {
                    // console.log("no");
                    res.status(422).json({
                              error: "User data not found"
                    })
          }
});



//skill add in databse
router.post("/skill", authentication, async (req, res) => {
          // console.log(req.body);
          try {
                    const {
                              skills
                    } = req.body;
                    // console.log(req.body);
                    // console.log(skill);

                    if (!skills || skills.length === "") {
                              return res.status(422).json({
                                        status: 201,
                                        error: "Skill is empty"
                              })
                    } else {
                              // console.log("find");
                              const user = req.getData;
                              // console.log(user);

                              user.skills.push(...skills);
                              // console.log(pus);

                              const updatedUser = await user.save();
                              // console.log(updatedUser);

                              res.status(200).json({
                                        status: 202,
                                        message: "Skill added successfully",
                                        user: updatedUser,
                              });
                    }

          } catch (error) {
                    res.status(422).json({
                              error: "Skill not add in database"
                    })
          }
});





// Define a route for deleting a skill
router.delete("/deleteskill", authentication, async (req, res) => {
          try {
                    const {
                              skillId
                    } = req.body; // Assuming you pass the skill ID in the request body

                    // console.log(req.body);

                    if (!skillId) {
                              return res.status(400).json({
                                        status: 400,
                                        error: "Skill ID is required",
                              });
                    } else {
                              const user = req.getData;
                              // console.log(user);

                              // const check = user.skills;
                              // console.log(check);


                              user.skills.pull(skillId);

                              // Save the updated user data
                              const updatedUser = await user.save();



                              res.status(200).json({
                                        status: 200,
                                        message: "Skill deleted successfully",
                                        user: updatedUser,
                              });
                    }
          } catch (error) {
                    res.status(422).json({
                              error: "Skill deletion failed",
                    });
          }
});






module.exports = router;