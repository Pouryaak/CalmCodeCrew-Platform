export interface Certificate {
  uid: string;
  filePath: string;
  generationDate: string;
  link: string;
  userId: string;
  workshopId: string;
}

export type UserCertificate = Certificate & {
  userName?: string;
  workshopName?: string;
};
