export enum INFO_MESSAGE_TYPE {
  ERROR,
  WARNING,
  SUCCESS
}

export class InfoMessage {
  type: INFO_MESSAGE_TYPE;
  text: string;

  constructor(type: INFO_MESSAGE_TYPE, message: string) {
    this.type = type;
    this.text = message;
  }
}
