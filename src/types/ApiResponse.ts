import { List } from "@/models/list";

export interface ApiResponse {
  success: boolean;
  message: string;
  lists?: Array<List>;
}
