import type { Iworkplace } from "../workplacesApi/workplaceApi.types";

export interface IPlan {
  id: number;
  workplaces: Iworkplace[];
  name: string;
  img: string;
  width: number;
  height: number;
}  

export interface IPlans {
  id: number;
  img: string;
  width: number;
  height: number;
}  