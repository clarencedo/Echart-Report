import React from 'react';
import { Button, Header, HeaderProps, SpaceBetween } from '@cloudscape-design/components';
import Link, { LinkProps } from '@cloudscape-design/components/link';
const FullPageHeader = ({title = 'Echarts Report', createButtonText = 'Create Report', extraActions = null,selectedItemsCount, onInfoLinkClick,...props}) => {
    const isOnlyOneSelected = selectedItemsCount === 1;
    const InfoLink = (props) => {
        return (
            <Link variant="info" {...props}>
            Info
        </Link>);
    }
    return (
        <Header
            variant="awsui-h1-sticky"
            info={onInfoLinkClick && <InfoLink onFollow={onInfoLinkClick} ariaLabel={`Information about ${title}.`} />}
            actions={
                <SpaceBetween size="xs" direction="horizontal">
                    {extraActions}
                    <Button data-testid="header-btn-view-details" disabled={!isOnlyOneSelected}>
                        View details
                    </Button>
                    {/*<Button data-testid="header-btn-edit" disabled={!isOnlyOneSelected}>*/}
                    {/*    Edit*/}
                    {/*</Button>*/}
                    <Button data-testid="header-btn-delete" disabled={selectedItemsCount === 0}>
                        Delete
                    </Button>
                    <Button data-testid="header-btn-create" variant="primary">
                        {createButtonText}
                    </Button>
                </SpaceBetween>
            }
            {...props}
        >
            {title}
        </Header>
    );
};

export default FullPageHeader;
