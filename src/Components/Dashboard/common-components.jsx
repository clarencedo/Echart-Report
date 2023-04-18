import React from 'react';
import { BreadcrumbGroup, HelpPanel } from '@cloudscape-design/components';
import Icon from '@cloudscape-design/components/icon';
import Link from '@cloudscape-design/components/link';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
// import styles from './styles.module.scss'
// import { SeparatedList } from './separated-list';
// import { resourcesBreadcrumbs } from '../../common/breadcrumbs';
// import { ExternalLinkGroup } from '../commons';
const labelSuffix = 'Opens in a new tab';
function ExternalLinkItem({ href, text }) {
    return (
        <Link href={href} ariaLabel={`${text} ${labelSuffix}`} target="_blank">
            {text}
        </Link>
    );
}
export const resourcesBreadcrumbs = [
    {
        text: 'Service',
        href: '#',
    },
    {
        text: 'Distributions',
        href: '#',
    },
];
export function SeparatedList({ ariaLabel, items }) {
    return (
        <ul aria-label={ariaLabel} >
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
}
export function ExternalLinkGroup({
                                      header = 'Learn more',
                                      groupAriaLabel,
                                      items,
                                      variant = 'default',
                                  }) {
    const externalIcon = (
        <span role="img" aria-label="Icon external Link">
      <Icon name="external" size="inherit" />
    </span>
    );

    if (variant === 'container') {
        return (
            <Container
                header={
                    <Header>
                        {header} {externalIcon}
                    </Header>
                }
            >
                <SeparatedList
                    ariaLabel={groupAriaLabel}
                    items={items.map((item, index) => (
                        <ExternalLinkItem key={index} href={item.href} text={item.text} />
                    ))}
                />
            </Container>
        );
    }

    return (
        <>
            <h3>
                {header} {externalIcon}
            </h3>
            <ul aria-label={groupAriaLabel}>
                {items.map((item, index) => (
                    <li key={index}>
                        <ExternalLinkItem href={item.href} text={item.text} />
                    </li>
                ))}
            </ul>
        </>
    );
}
export const Breadcrumbs = () => (
    <BreadcrumbGroup items={resourcesBreadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />
);

const toolsFooter = (
    <ExternalLinkGroup
        items={[
            {
                text: 'Working with distributions',
                href: 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-working-with.html',
            },
            {
                text: 'Values that CloudFront displays on the console',
                href: 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-returned.html',
            },
        ]}
    />
);
export const ToolsContent = () => (
    <HelpPanel footer={toolsFooter} header={<h2>Distributions</h2>}>
        <p>
            View your current distributions and related information such as the associated domain names, delivery methods, SSL
            certificates, and more. To drill down even further into the details, choose the name of an individual
            distribution.
        </p>
    </HelpPanel>
);
