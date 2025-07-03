const fetch = require("node-fetch");
const baseUrl = process.env.VIXXO_S3_BUCKET;

module.exports = (req, res) => {
  const fileKey = req.params.key;
  const options = { method: "HEAD" };
  fetch(`${baseUrl}${fileKey}`, options).then(response => {
    if (!response.ok) {
      return res.status(response.status).send({
        message: "Proxy: Unexpected Error",
        ...response.body
      });
    }
    const header = response.headers._headers["x-amz-meta-description"][0];
    return res.send({ header });
  });
};
