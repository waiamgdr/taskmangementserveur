const express = require("express");
const router = express.Router();
const { register, Login, userdata } = require("../controlles/Usercontrolles");
const { check } = require("express-validator");
const userMiddleware= require("../middleware/UserMiddleware");
router.post(
  "/register",
  [
    check("email", "nota valide email").isEmail().normalizeEmail(),
    check("password", "Your passwor should containt .... ").isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    }),
  ],
  register
);
router.post("/login", Login);
router.get('/getdata',userMiddleware,userdata)
module.exports = router;
