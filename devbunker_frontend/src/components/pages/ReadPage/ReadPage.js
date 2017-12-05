import React from 'react';

import { PageTemplate } from 'components';
import { HeaderContainer, ReadContainer } from 'containers';

const WritePage = () => {
    return (
        <PageTemplate header={<HeaderContainer solid/>} padding minimum>
            <ReadContainer/>
        </PageTemplate>
    );
};

export default WritePage;