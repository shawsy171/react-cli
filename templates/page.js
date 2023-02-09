import capitalize from "../utils/capitalize"

const pageTemplate = (fileName) => {
  const capFileName = capitalize(fileName);
  
  return `
import { Button, ContentLayout, Header } from '@amzn/awsui-components-react';
import { useNavigate } from 'react-router-dom';
export const ${capFileName} = () => {
  const navigate = useNavigate();
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
              Create Engagement
            </Button>
          }
        >
          ${capFileName}
        </Header>
      }
    >
      ${capFileName} content
    </ContentLayout>
  );
};`}

module.exports = pageTemplate;
