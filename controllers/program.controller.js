const User = require("../models/user.model");

async function getProgram(req, res, next) {
  const userID = req.params.id;
  
  // try {
  //   const user = await User.getUserByID(userID);
  // } catch (error) {
  //   return next(error);    
  // }

  //try catch
  //implement methods in the user model to retrieve
  //logs and nutrition by reference
  //Check if falsy before proceeding (not initialized or empty)
  
  //pass the user logs array and nutrition plan to render
  res.render("client/program");
}

module.exports = {
  getProgram: getProgram,
};