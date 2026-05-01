module.exports = async function handler(req, res) {
  console.log("test");
  return res.status(200).json({
    message: "ok",
  });
};
