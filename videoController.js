const fs = require("fs");

function videoController(req, res) {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires range header");
  }

  //  Get video stats
  const videoPath = "e112.mp4";
  const videoSize = fs.statSync(videoPath).size;

  //  Parse range
  const CHUNK_SIZE = 10 ** 6; //  1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  //  Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start} - ${end} / ${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  //  HTTP Status 206 for partial content
  res.writeHead(206, headers);

  const videoStream = fs.createReadStream(videoPath, { start, end });

  videoStream.pipe(res);
}

module.exports.videoController = videoController;

