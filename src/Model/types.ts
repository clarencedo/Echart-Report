export interface IProps {
  dataList: RTQData[];
}
export interface RTQData {
  assessment_performed_date: string;
  category_id: string;
  category_name: string;
  coming_into_force_date: string;
  country_code: string;
  country_id: string;
  country_name: string;
  created_date: string;
  created_month: string;
  created_year: string;
  department_name: string;
  implementation_target_date: string;
  implementation_tasks: string;
  is_assessment_required: string;
  is_compliance: string;
  is_overdue: string;
  module_id: string;
  module_name: string;
  policy_id: string;
  policy_is_with_impact: string;
  policy_name: string;
  policy_priority: string;
  policy_status: string;
  product_name: string;
  product_type_id: string;
  reason_for_no_impact: string;
  record_closed_date: string;
  region: string;
  surveillance_source: string;
  title: string;
  traige_date: string;
}

type Chart = {
  title?: string;
  xData?: string[];
  seriesData?: number[];
  option: any;
  className?: string;
};
export interface IEchartProps {
   title?: string;
   xData?: string[];
   seriesData?: number[];
   option: any;
   className?: string;
 }