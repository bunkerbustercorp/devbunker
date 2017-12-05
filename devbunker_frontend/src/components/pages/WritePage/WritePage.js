import React from 'react';

import { PageTemplate } from 'components';
import { HeaderContainer, WriteContainer } from 'containers';

const WritePage = () => {
    return (
        <PageTemplate header={<HeaderContainer solid/>} padding minimum>
            <WriteContainer/>
        </PageTemplate>
    );
};

export default WritePage;