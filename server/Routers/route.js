const express = require("express");
const router = new express.Router();
const userdb = require("../Model/userSchema");


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
})


module.exports = router;