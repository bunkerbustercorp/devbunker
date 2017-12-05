import React from 'react';

import { PageTemplate } from 'components';
import { HeaderContainer, CommunityContainer } from 'containers';

const CommunityPage = () => {
    return (
        <PageTemplate header={<HeaderContainer solid/>} padding>
            <CommunityContainer/>
        </PageTemplate>
    );
};

export default CommunityPage;