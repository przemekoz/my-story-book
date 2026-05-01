const Busboy = require("busboy");

module.exports = function handler(req, res) {
  res.status(200).json({ ok: true });
};
