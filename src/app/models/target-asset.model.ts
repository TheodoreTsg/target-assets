export class TargetAsset {
  id: number;
  isStartable: boolean;
  location: string;
  owner: string;
  createdBy: string;
  name: string;
  status: string;
  tags: string[];
  cpu: number;
  ram: number;
  createdAt: string;
  parentId: number;

  constructor() {
    this.id = 0;
    this.isStartable = false;
    this.location = '';
    this.owner = '';
    this.createdBy = '';
    this.name = '';
    this.status = '';
    this.tags = [];
    this.cpu = 0;
    this.ram = 0;
    this.createdAt = '';
    this.parentId = 0;
  }
}
