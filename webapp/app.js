const video = document.getElementById('video');
const vendorUrl = window.URL || window.webkitURL;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const photo = document.getElementById('photo');
let _streamCopy = null;

// AWS info
const awsRegion = '';
const identityPoolId = '';
const s3Bucket = '';

function getWebcam() {
  navigator.getMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    naivgator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  navigator.getMedia(
    {
      video: true,
      audio: false,
    },
    (stream) => {
      _streamCopy = stream;
      video.srcObject = stream;
      video.play();
    },
    (error) => {
      console.error(error);
    }
  );
}

function uploadToS3() {
  AWS.config.region = awsRegion; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId,
  });

  var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: s3Bucket },
  });

  console.log('upload');
  var data = canvas.toDataURL('image/png');

  var params = {
    Key: Date.now().toString(), //example
    ContentType: 'text/plain', //sending a base64 text string
    Body: data, //the base64 string is now the body
  };

  s3.putObject(params, function (err, data) {
    if (err) console.error(err);
    console.log(data);
    alert('Upload to S3 Complete!');
  });
}

// event listeners
document.getElementById('upload').addEventListener('click', uploadToS3);
document.getElementById('start').addEventListener('click', getWebcam);
document.getElementById('stop').addEventListener('click', () => {
  _streamCopy.getTracks().forEach((track) => {
    track.stop();
  });
});
document.getElementById('capture').addEventListener('click', () => {
  ctx.drawImage(video, 0, 0, 400, 300);
  photo.setAttribute('src', canvas.toDataURL('image/png'));
  console.log(canvas.toDataURL('image/png'));
});
