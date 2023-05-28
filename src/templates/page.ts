import capitalize from "../utils/capitalize";

const pageTemplate = (pageName: string, moduleName: string) => { // it this will require module name
  const capPageName = capitalize(pageName);

  return `
import { Button, ContentLayout, Header, Container } from '@amzn/awsui-components-react';
import { useNavigate } from 'react-router-dom';
import ${pageName}Routes from '@modules/${moduleName}/routes/${pageName}'

const ${capPageName} = () => {

  const {
    ${pageName}: { breadcrumbs },
  } = ${pageName}Routes;

  const navigate = useNavigate();
  breadcrumbs();

  return (
    <ContentLayout
      header={
        <Header
          data-cy="page-title"
          variant="h1"
          actions={
            <Button
              data-cy="header-btn"
              variant="primary"
              onClick={() => navigate('/')}
            >
            Navigation button
            </Button>
          }
        >
          ${capPageName}
        </Header>
      }
    >
      <Container >
        ${capPageName} content
      </Container>
    </ContentLayout>
  );
};

export default ${capPageName};
`}

export default pageTemplate;
