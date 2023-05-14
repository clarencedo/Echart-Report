const columns = [
    {
        id: "assessment_performed_date",
        header: "assessment_performed_date",
        cell: e => e.assessment_performed_date,
        sortingField: "assessment_performed_date"
    },
    {
        id: "category_id",
        header: "category_id",
        cell: e => e.category_id,
        sortingField: "category_id"
    },
    {
        id: "category_name",
        header: "category_name",
        cell: e => e.category_name,
        sortingField: "category_name"
    },
    {
        id: "coming_into_force_date",
        header: "coming_into_force_date",
        cell: e => e.coming_into_force_date,
        sortingField: "coming_into_force_date"
    },
    {
        id: "country_code",
        header: "country_code",
        cell: e => e.country_code,
        sortingField: "country_code"
    },
    {
        id: "country_id",
        header: "country_id",
        cell: e => e.country_id,
        sortingField: "country_id"
    },
    {
        id: "country_name",
        header: "country_name",
        cell: e => e.country_name,
        sortingField: "country_name"
    },
    {
        id: "created_date",
        header: "created_date",
        cell: e => e.created_date,
        sortingField: "created_date"
    },
    {
        id: "created_month",
        header: "created_month",
        cell: e => e.created_month,
        sortingField: "created_month"
    },
    {
        id: "created_year",
        header: "created_year",
        cell: e => e.created_year,
        sortingField: "created_year"
    },    {
        id: "department_name",
        header: "department_name",
        cell: e => e.department_name,
        sortingField: "department_name"
    },    {
        id: "implementation_target_date",
        header: "implementation_target_date",
        cell: e => e.implementation_target_date,
        sortingField: "implementation_target_date"
    },    {
        id: "implementation_tasks",
        header: "implementation_tasks",
        cell: e => e.implementation_tasks,
        sortingField: "implementation_tasks"
    },    {
        id: "is_assessment_required",
        header: "is_assessment_required",
        cell: e => e.is_assessment_required,
        sortingField: "is_assessment_required"
    },    {
        id: "is_compliance",
        header: "is_compliance",
        cell: e => e.is_compliance,
        sortingField: "is_compliance"
    },    {
        id: "is_overdue",
        header: "is_overdue",
        cell: e => e.is_overdue,
        sortingField: "is_overdue"
    },
    {
        id: "module_id",
        header: "module_id",
        cell: e => e.module_id,
        sortingField: "module_id"
    },
    {
        id: "module_name",
        header: "module_name",
        cell: e => e.module_name,
        sortingField: "module_name"
    },
    {
        id: "policy_id",
        header: "policy_id",
        cell: e => e.policy_id,
        sortingField: "policy_id"
    },
    {
        id: "policy_is_with_impact",
        header: "policy_is_with_impact",
        cell: e => e.policy_is_with_impact,
        sortingField: "policy_is_with_impact"
    },
    {
        id: "policy_name",
        header: "policy_name",
        cell: e => e.policy_name,
        sortingField: "policy_name"
    },
    {
        id: "policy_priority",
        header: "policy_priority",
        cell: e => e.policy_priority,
        sortingField: "policy_priority"
    },
    {
        id: "policy_status",
        header: "policy_status",
        cell: e => e.policy_status,
        sortingField: "policy_status"
    },
    {
        id: "product_name",
        header: "product_name",
        cell: e => e.product_name,
        sortingField: "product_name"
    },
    {
        id: "product_type_id",
        header: "product_type_id",
        cell: e => e.product_type_id,
        sortingField: "product_type_id"
    },
    {
        id: "reason_for_no_impact",
        header: "reason_for_no_impact",
        cell: e => e.reason_for_no_impact,
        sortingField: "reason_for_no_impact"
    },
    {
        id: "record_closed_date",
        header: "record_closed_date",
        cell: e => e.record_closed_date,
        sortingField: "record_closed_date"
    },
    {
        id: "region",
        header: "region",
        cell: e => e.region,
        sortingField: "region"
    },
    {
        id: "surveillance_source",
        header: "surveillance_source",
        cell: e => e.surveillance_source,
        sortingField: "surveillance_source"
    },
    {
        id: "title",
        header: "title",
        cell: e => e.title,
        sortingField: "title"
    },
    {
        id: "traige_date",
        header: "traige_date",
        cell: e => e.traige_date,
        sortingField: "traige_date"
    },
    {
        id: "__typename",
        header: "__typename",
        cell: e => e.__typename,
        sortingField: "__typename"
    },
]
export default  columns;