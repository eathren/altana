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

export interface GraphNode {
  id: number;
  index: number;
  name: string;
  px: number;
  py: number;
  size: number;
  weight: number;
  x: number;
  y: number;
  subindex: number;
  startAngle: number;
  endAngle: number;
  value: number;
  fixed: boolean;
  children: GraphNode[];
  _children: GraphNode[];
  parent: GraphNode;
  depth: number;
}

export interface GraphLink {
  source: GraphNode;
  target: GraphNode;
}
