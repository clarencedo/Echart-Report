import React from 'react';
import { Button, Header, HeaderProps, SpaceBetween } from '@cloudscape-design/components';
import Link, { LinkProps } from '@cloudscape-design/components/link';
import {useNavigate} from "react-router-dom";
const FullPageHeader = ({title = 'Echarts Report', createButtonText = 'Create Report', extraActions = null,item,selectedItemsCount, onInfoLinkClick,...props}) => {
    const isOnlyOneSelected = selectedItemsCount === 1;
    console.log("selected",item)
    const navigate = useNavigate();
    const InfoLink = (props) => {
        return (
            <Link variant="info" {...props}>
            Info
        </Link>);
    }
    const create = () =>{
        navigate('/create/true')
    }
    const view = () => {
        let value = [];
        item.forEach((e)=>{
            value = e.options
        })
        navigate('/create/false',{state:{
            name : "tom",
                ops: value,
            }})
    }
    return (
        <Header
            variant="awsui-h1-sticky"
            info={onInfoLinkClick && <InfoLink onFollow={onInfoLinkClick} ariaLabel={`Information about ${title}.`} />}
            actions={
                <SpaceBetween size="xs" direction="horizontal">
                    {extraActions}
                    <Button data-testid="header-btn-view-details" disabled={!isOnlyOneSelected} onClick={view}>
                        View details
                    </Button>
                    {/*<Button data-testid="header-btn-edit" disabled={!isOnlyOneSelected}>*/}
                    {/*    Edit*/}
                    {/*</Button>*/}
                    <Button data-testid="header-btn-delete" disabled={selectedItemsCount === 0}>
                        Delete
                    </Button>
                    <Button data-testid="header-btn-create" variant="primary" onClick={create}>
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
