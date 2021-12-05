var aws = require("aws-sdk");
const fs = require("fs");

const bucketName = "objects-bucket-dl";
const region = "ap-southeast-2";
const accessKey_Id = process.env.AWS_ACCESS_KEY;
const secretAccess_Key = process.env.AWS_SECRET_KEY;

// Function to download file from S3 bucket
async function s3downloadFile(filekey) {
  aws.config.update({
    accessKeyId: accessKey_Id,
    secretAccessKey: secretAccess_Key,
    region: region,
  });
  var s3 = new aws.S3();
  var options = {
    Bucket: "objects-bucket-dl",
    Key: filekey,
  };
  // Checking whether the file is available or not
  try {
    let found = await s3
      .headObject(options)
      .promise()
      .then(
        () => true,
        (err) => {
          if (err.code === "NotFound") {
            return false;
          }
          throw err;
        }
      );
    console.log(found);
    if (found) {
      var fileStream = s3.getObject(options).createReadStream();
      return fileStream;
    }
  } catch (err) {
    console.log(`Err: ${err.code} with status code ${err.statusCode}`);
  }
}

function s3uploadFile(file) {
  let s3bucket = new aws.S3({
    accessKeyId: accessKey_Id,
    secretAccessKey: secretAccess_Key,
    Bucket: bucketName,
  });
  var params = {
    Bucket: bucketName,
    Body: fs.createReadStream(file.path),
    Key: file.filename,
  };

  s3bucket.upload(params, function (err, data) {
    if (err) {
      console.log("error in callback");
      console.log(err);
    }
    console.log("success");
    console.log(data);

  });

  return "S3 File Uploaded Successfully"
}

module.exports = {
  s3downloadFile,
  s3uploadFile,
};
