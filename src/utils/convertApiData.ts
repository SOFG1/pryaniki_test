import dayjs from "dayjs";
import { ITableItem } from "../api/tableApi";
import { TABLE_ITEM_PROPERTIES } from "../constants";



//Handle date values
export const convertApiData = (item: ITableItem) => {
  const data: any = {};
  Object.keys(item).forEach((prop) => {
    if (prop === "id") return;
    const isDate =
      TABLE_ITEM_PROPERTIES.find((p) => p.prop === prop)?.type === "date";
    if (isDate) {
      data[prop] = dayjs(item[prop]);
    }
    data[prop] = item[prop];
  });
  return data;
};
