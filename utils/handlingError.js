const handleCatchBlock = (res, error, message = "somthing went wrong") => {
  console.log(message, error);
  return res.status(500).json({ success: false, msg: message });
};
const handleRequired = (res, message = "that is required") => {
  res.status(400).json({ success: false, msg: message });
};
const handleNotFound = (res, message = "task not found") => {
  res.status(404).json({ success: false, msg: message });
};
module.exports = { handleCatchBlock, handleRequired, handleNotFound };
