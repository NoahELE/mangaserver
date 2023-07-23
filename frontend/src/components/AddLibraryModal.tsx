import { Form, Input, Modal, type FormProps } from 'antd';
import { type ReactElement } from 'react';
import { addLibrary } from '../api';
import { type AddLibraryDto } from '../entity';
import { useShowError } from '../utils';

interface Props {
  open: boolean;
}
export default function AddLibraryModal({ open }: Props): ReactElement {
  const [form] = Form.useForm();
  const showError = useShowError();
  const onFinish: FormProps['onFinish'] = (library: AddLibraryDto) => {
    addLibrary(library).catch((error: Error) => {
      showError(error);
    });
  };

  return (
    <Modal title="Add Library" open={open} onOk={form.submit}>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'please input the name of the library',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="path"
          label="Path"
          rules={[
            {
              required: true,
              message: 'please input the path of the library',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
