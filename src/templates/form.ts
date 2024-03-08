const formTemplate = (formName: string, formFields: any) => {
  return `
  import {
    Box,
    Button,
    ColumnLayout,
    Container,
    Form,
    FormField,
    Header,
    Input,
    SpaceBetween,
    Spinner,
  } from '@amzn/awsui-components-react';
  import { yupResolver } from '@hookform/resolvers/yup';
  import { useState } from 'react';
  import { Controller, useForm } from 'react-hook-form';
  import { useNavigate } from 'react-router-dom';
  import { object, string } from 'yup';

  interface UploadFormProps {
    onSubmit: (data: any) => void;
    isLoading?: boolean;
    taskId?: string;
    engagement?: any;
    submitting?: boolean;
  }

  const UploadForm = ({ onSubmit, isLoading, taskId, engagement, submitting }: UploadFormProps) => {
    const schema = object().shape({
      upload: string(),
    });
    const [textVal, setTextVal] = useState('');
    const navigate = useNavigate();

    const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
    } = useForm({
      mode: 'onBlur',
      resolver: yupResolver(schema),
    });

    const handleOnChanged = (e: any) => {
      setTextVal(e.detail.value);
    };

    return (
      <div>
        {isLoading ? (
          <Spinner size="large" />
        ) : (
          <Box>
            <Header variant="h1">Upload Artifact</Header>

            <ColumnLayout variant="text-grid">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Form
                  actions={
                    <SpaceBetween direction="horizontal" size="l">
                      <Button
                        formAction="none"
                        variant="link"
                        onClick={() => navigate(\`/ engagement /  engagement?.id /task/taskId \`)}
                      >
                        Cancel
                      </Button>
                      <Button variant="primary">
                        Upload Artifact {submitting && <Spinner size="normal" />}
                      </Button>
                    </SpaceBetween>
                  }
                >
                  <Controller
                    name={'upload'}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <FormField
                          label="Type"
                          description="Upload type e.g. findings, evidence, final report, etc."
                          // errorText={errors.upload?.message}
                        >
                        <div className="alias-input-field">
                          <Input
                            value={textVal}
                            onChange={(e) => {
                              onChange(e);
                              handleOnChanged(e);
                            }}
                          />
                        </div>
                        </FormField>
                      </>
                    )}
                  />
                </Form>
              </form>
            </ColumnLayout>
          </Box>
        )}
      </div>
    );
  };

  export default UploadForm;
  `;
};
