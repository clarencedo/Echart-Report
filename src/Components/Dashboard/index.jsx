import React, { useState, useEffect, useRef } from 'react';
import DataProvider from "./data-provider";
import { CARD_DEFINITIONS, VISIBLE_CONTENT_OPTIONS, PAGE_SIZE_OPTIONS, DEFAULT_PREFERENCES } from "./cards-config";
import { Cards, CollectionPreferences, Pagination, Box, SpaceBetween,Button, TextFilter } from '@cloudscape-design/components';
import FullPageHeader from "./full-page-header";
import { useCollection } from '@cloudscape-design/collection-hooks';
import { PaginationProps, TableProps } from '@cloudscape-design/components';
// import {paginationAriaLabels} from "../../i18n-strings/pagination";
const DetailsCards = ({loadHelpPanelContent}) => {
    const [loading, setLoading] = useState(true);
    const [distributions, setDistributions] = useState([]);
    const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES)
    const  TableEmptyState = ({ resourceName }) => (
        <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
            <SpaceBetween size="xxs">
                <div>
                    <b>No {resourceName.toLowerCase()}s</b>
                    <Box variant="p" color="inherit">
                        No {resourceName.toLowerCase()}s associated with this resource.
                    </Box>
                </div>
                <Button>Create {resourceName.toLowerCase()}</Button>
            </SpaceBetween>
        </Box>
    );
    const TableNoMatchState = props => (
        <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
            <SpaceBetween size="xxs">
                <div>
                    <b>No matches</b>
                    <Box variant="p" color="inherit">
                        We can't find a match.
                    </Box>
                </div>
                <Button onClick={props.onClearFilter}>Clear filter</Button>
            </SpaceBetween>
        </Box>
    );
    const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
        distributions,
        {
            filtering: {
                empty: <TableEmptyState resourceName="Distribution" />,
                noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
            },
            pagination: { pageSize: preferences.pageSize },
            selection: {},
        }
    );

    const getTextFilterCounterText = (count) =>{
        return   `${count} ${count === 1 ? 'match' : 'matches'}`;
    }
    const getHeaderCounterText = (items, selectedItems) => {
        return selectedItems && selectedItems?.length > 0 ? `(${selectedItems.length}/${items.length})` : `(${items.length})`;
    }
    // const paginationAriaLabels = (totalPages) => PaginationProps.Labels = totalPages =>({
    //     nextPageLabel: 'Next page',
    //     previousPageLabel: 'Previous page',
    //     pageLabel: pageNumber => `Page ${pageNumber} of ${totalPages || 'all pages'}`,
    // });
    useEffect(() =>{
        setDistributions(new DataProvider().getData())
        setLoading(false)
    },[])


    return (
        <Cards
            {...collectionProps}
            stickyHeader={true}
            cardDefinition={CARD_DEFINITIONS}
            visibleSections={preferences.visibleContent}
            loading={loading}
            loadingText="Loading report"
            items={items}
            selectionType="multi"
            variant="full-page"

            header={
                <FullPageHeader
                    selectedItemsCount={collectionProps.selectedItems.length}
                    counter={getHeaderCounterText(distributions, collectionProps.selectedItems)}
                    onInfoLinkClick={loadHelpPanelContent}
                />
            }
            filter={
                <TextFilter
                    {...filterProps}
                    filteringAriaLabel="Filter distributions"
                    filteringPlaceholder="Find distributions"
                    filteringClearAriaLabel="Clear"
                    countText={getTextFilterCounterText(filteredItemsCount)}
                    disabled={loading}
                />
            }
            pagination={
                <Pagination
                    {...paginationProps}
                    // ariaLabels={paginationAriaLabels(paginationProps.pagesCount)}
                    disabled={loading}
                />
            }
            preferences={
                <CollectionPreferences
                    title="Preferences"
                    confirmLabel="Confirm"
                    cancelLabel="Cancel"
                    disabled={loading}
                    preferences={preferences}
                    onConfirm={({ detail }) => setPreferences(detail)}
                    pageSizePreference={{
                        title: 'Page size',
                        options: PAGE_SIZE_OPTIONS,
                    }}
                    visibleContentPreference={{
                        title: 'Select visible columns',
                        options: VISIBLE_CONTENT_OPTIONS,
                    }}
                />
            }
        />
    );
};

export default DetailsCards;
