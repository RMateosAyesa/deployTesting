export interface IocDto {
  name: string;
  origin: string;
  location: string;
  server: string;
}

export interface GetIocServersResponseDto {
  total: number;
  items: IocDto[];
  page: number;
  pages: number;
}
