exports.SuccessResponseModel = class SuccessResponseModel {
  constructor(payload, statusCode) {
    this.statusCode = statusCode;
    this.payload = {
      item: payload.Item,
      items: payload.Items,
      count: payload.Count,
      scannedCount: payload.ScannedCount
    };
  }
} 