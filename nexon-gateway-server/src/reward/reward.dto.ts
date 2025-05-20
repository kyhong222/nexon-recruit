export class CreateRewardDto {
  name: string;
  description: string;
  items: string[];
}
export class ModifyRewardDto {
  _id: string;
  name: string;
  description: string;
  items: string[];
}
