import gql from "graphql-tag";
export default gql(`
query MyQuery {
  ReportingDashboard {
    assessment_performed_date
    category_id
    category_name
    coming_into_force_date
    country_code
    country_id
    country_name
    created_date
    created_month
    created_year
    department_name
    implementation_target_date
    implementation_tasks
    is_assessment_required
    is_compliance
    is_overdue
    module_id
    module_name
    policy_id
    policy_is_with_impact
    policy_name
    policy_priority
    policy_status
    product_name
    product_type_id
    reason_for_no_impact
    record_closed_date
    region
    surveillance_source
    title
    traige_date
    }
  }`);
// export default gql(`
// query {
//  MyQuery {
//   Test {
//     assessment_performed_date
//     category_id
//     category_name
//     coming_into_force_date
//     country_code
//     country_id
//     country_name
//     created_date
//     created_month
//     created_year
//     department_name
//     implementation_target_date
//     implementation_tasks
//     is_assessment_required
//     is_compliance
//     is_overdue
//     module_id
//     module_name
//     policy_id
//     policy_is_with_impact
//     policy_name
//     policy_priority
//     policy_status
//     product_name
//     product_type_id
//     reason_for_no_impact
//     record_closed_date
//     region
//     surveillance_source
//     title
//     traige_date
//     }
//   }
// }`);

