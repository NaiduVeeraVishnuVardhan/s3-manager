const s3Op = require("../s3_operations");
const uploadFile = require("../Middlewareupload");
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
    try {
      await uploadFile(req, res);
      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
      try {
        const result = await s3Op.s3uploadFile(req.file);
        res.status(201).json({
          error: false,
          message: "file store",
          result,
        });
      } catch (e) {
        res.status(500).json({
          error: true,
          message: "File could not be uploaded",
        });
        console.log(e);
      }

      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });
    } catch (err) {
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
    }
  },
};
