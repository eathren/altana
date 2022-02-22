export type Company = {
  altana_canon_id?: string;
  company_context: CompanyContext;
  company_name: string;
  data_sources: string[];
  restrictions: string[];
  risks: string[];
};

export type CompanyContext = {
  buyers?: any[];
  countries_of_destination?: string[];
  countries_of_operation?: string[];
  countries_of_origin?: string[];
  hs_traded?: string[];
  industries?: string[];
  number_records?: Number;
  products_received?: string[];
  products_sent?: string[];
  suppliers?: string[];
  trading_partners?: string[];
};
