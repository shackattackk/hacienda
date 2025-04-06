export interface Farm {
  id: string;
  name: string;
  location: string;
  size: number;
  crop: string;
  plantedDate: string;
  harvestDate: string;
  ndviData?: any;
}
