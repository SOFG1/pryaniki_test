
type TableItemProp = {
  prop: string
  viewName: string
  type: "string" | "date"
}

export const TABLE_ITEM_PROPERTIES: TableItemProp[] = [
  { prop: "companySigDate", viewName: "Company Signature Date", type: "date" },
  {
    prop: "companySignatureName",
    viewName: "Company Signature Name",
    type: "string",
  },
  { prop: "documentName", viewName: "Document Name", type: "string" },
  { prop: "documentStatus", viewName: "Document Status", type: "string" },
  { prop: "documentType", viewName: "Document Type", type: "string" },
  { prop: "employeeNumber", viewName: "Employee Number", type: "string" },
  { prop: "employeeSigDate", viewName: "Employee Sig Date", type: "date" },
  {
    prop: "employeeSignatureName",
    viewName: "Employee Signature Name",
    type: "string",
  },
];
