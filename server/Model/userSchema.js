const {
          default: mongoose
} = require("mongoose");
const validator = require("validatorjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keysecret = "jklknhgfdreswercfghbnjhkilmnjhg";




const userSchema = new mongoose.Schema({
          name: {
                    type: String,
                    required: true
          },
          email: {
                    type: String,
                    unique: true,
                    required: true,
                    validator(value) {
                              if (!validator.isEmail(value)) {
                                        throw new Error('Invalid Email');
                              }
                    }
          },
          password: {
                    type: String,
                    required: true,
                    minlength: 6
          },
          cpassword: {
                    type: String,
                    required: true,
                    minlength: 6
          },
          tokens: [{
                    token: {
                              type: String,
                              required: true
                    }
          }]
});




//hash password
userSchema.pre('save', async function (next) {
          if (this.isModified('password')) {
                    this.password = await bcrypt.hash(this.password, 12);
                    this.cpassword = await bcrypt.hash(this.cpassword, 12);
          }
          return next();
});


//generate token
userSchema.methods.getSignedToken = function () {
          // Create a payload containing the user's ID (_id field)
          const payload = {
                    user: {
                              id: this._id,
                    },
          };

          try {
                    // Sign the payload with the secret key to create the token
                    const token = jwt.sign(payload, keysecret, {
                              expiresIn: "24h", // Token expires in 24 hours (adjust as needed)
                    });

                    return token;
          } catch (error) {
                    throw new Error("Failed to generate token");
          }
}


const userdb = mongoose.model("users", userSchema);

module.exports = userdb;