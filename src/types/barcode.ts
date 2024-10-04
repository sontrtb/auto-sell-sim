export interface IBarcode {
    status: boolean;
    err?: {
      code: string;
      message: string;
    };
    barcode?: string;
  }