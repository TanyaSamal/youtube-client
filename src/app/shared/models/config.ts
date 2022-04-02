export interface IConfig {
  apiUrl: string;
  key: string;
  searchUrl: string;
  statisticUrl: string;
  type: string;
  part: string;
  maxResults: number;
  statisticPart: string;
}

export interface IConfigParams {
  type?: string;
  part: string;
  maxResults?: number;
  id?: string;
  q?: string;
}
