import { FC } from 'react';

import { Title } from '../../styled/Title';
import { CenteredBlock } from '../../styled/Wrappers';

export const NotFoundBlock: FC = () => {
  return (
    <CenteredBlock>
      <Title>No results found</Title>
    </CenteredBlock>
  );
};
