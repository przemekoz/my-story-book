export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { login, password } = req.body || {};

    return res.status(200).json({
      status: login === "kat" && password === "test1234" ? "ok" : "fail",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "login failed",
    });
  }
}
