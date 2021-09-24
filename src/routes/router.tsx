import { Route } from 'react-router-dom';
import { FC } from 'react';
import ContentLayout from 'components/layout/layout';

interface Props {
  titleHeader: string;
  component: FC;
  exact: boolean;
  path: string;
  children?: React.ReactNode;
}

const Router: FC<Props> = ({ titleHeader, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return (
          <ContentLayout titleHeader={titleHeader}>
            <Component />
          </ContentLayout>
        );
      }}
    />
  );
};

export default Router;
