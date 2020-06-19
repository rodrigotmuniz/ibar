const { SuccessResponseModel } = require('./index');

const input = {
  ExecutedVersion: '23',
  Payload:'{"statusCode":200,"payload":{"items":[{"verificationCode":181409,"historic":[{"userId":"userId","datetime":"Wed Jun 17 2020 17:52:38 GMT+0000 (Coordinated Universal Time)","item":{}}],"isEmailConfirmed":false,"id":"5BgfgGWQPSAXgSYXAYADpf","email":"b@gmail.com"},{"verificationCode":155442,"historic":[{"userId":"userId","datetime":"Wed Jun 17 2020 14:51:16 GMT+0000 (Coordinated Universal Time)","item":{}}],"isEmailConfirmed":true,"id":"eqqximEEbCp5FuM1rNJqZ9","email":"b@gmail.com"},{"verificationCode":230937,"historic":[{"userId":"userId","datetime":"Wed Jun 17 2020 17:54:19 GMT+0000 (Coordinated Universal Time)","item":{}}],"isEmailConfirmed":false,"id":"q5uSHrSSUEyshbhPBq6iPq","email":"b@gmail.com"},{"verificationCode":303696,"historic":[{"userId":"userId","datetime":"Wed Jun 17 2020 17:55:17 GMT+0000 (Coordinated Universal Time)","item":{}}],"isEmailConfirmed":false,"id":"gEurtNGX3PzVGUMB94sdv2","email":"b@gmail.com"}],"count":4,"scannedCount":22}}'
,
  StatusCode: 200
}

console.log(JSON.stringify(new SuccessResponseModel(1), null, 2))