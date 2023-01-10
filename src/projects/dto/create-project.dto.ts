export class CreateProjectDto {
  name: string;
  stack: string[];
  packages: string[];
  github: string;
  description: string;

  devId: string;
}
