import { API as AMPLIFY } from "aws-amplify";
import { config } from "../../config";

export const fetchAll = async (path: string) => {
  return AMPLIFY.get(config.API.NAME, path, {});
};

export const createOne = (path: string, data: any) => {
  return AMPLIFY.post(config.API.NAME, path, { body: data });
};

export const updateOne = (path: string, id: string, data: any) => {
  return AMPLIFY.put(config.API.NAME, path, { body: { id, data } });
};

export const deleteOne = (path: string, itemId: string) => {
  return AMPLIFY.del(config.API.NAME, path, { body: { itemId } });
};