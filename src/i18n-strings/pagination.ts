
import { PaginationProps, TableProps } from '@cloudscape-design/components';

export const paginationAriaLabels: (totalPages?: number) => PaginationProps.Labels = totalPages => ({
    nextPageLabel: 'Next page',
    previousPageLabel: 'Previous page',
    pageLabel: pageNumber => `Page ${pageNumber} of ${totalPages || 'all pages'}`,
});
