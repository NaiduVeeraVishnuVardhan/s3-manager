const s3Op = require("../s3_operations");

module.exports = {
  async download(req, res) {
    const fileKey = req.body.key;
    console.log("Trying to download file", fileKey);
    try {
      res.attachment(fileKey);
      const fileStream = await s3Op.s3downloadFile(fileKey);
      fileStream.pipe(res);
    } catch (e) {
      res.status(404).json({ error: true, message: "file not found" });
    }
  },

  async upload(req, res) {
      if (req.file === undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }

      try {
        const result = await s3Op.s3uploadFile(req.file);
        res.status(201).json({
          error: false,
          message: "S3 File Upload Success",
          result,
        });
      } catch (e) {
        res.status(500).json({
          error: true,
          message: "S3 File Upload Failed",
        });
        console.log(e);
      }
    },

};
