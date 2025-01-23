export class ChargeResponse {
  linkQrCode: string;
  imageQrCode: string;
  chargeId: number;

  constructor(linkQrCode: string, imageQrCode: string, chargeId: number) {
    this.linkQrCode = linkQrCode;
    this.imageQrCode = imageQrCode;
    this.chargeId = chargeId;
  }
}
