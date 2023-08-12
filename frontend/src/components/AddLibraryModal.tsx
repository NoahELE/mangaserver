import { Form, Input, Modal, type FormProps } from 'antd';
import { type ReactElement } from 'react';
import { addLibrary } from '../api';
import { type AddLibraryDto } from '../entity';
import { useShowError } from '../utils';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function AddLibraryModal({
  open,
  setOpen,
}: Props): ReactElement {
  const [form] = Form.useForm();
  const showError = useShowError();
  const onFinish: FormProps['onFinish'] = (library: AddLibraryDto) => {
    addLibrary(library).catch((error: Error) => {
      showError(error);
    });
  };
  const onOk = (): void => {
    form.submit();
    setOpen(false);
  };

  return (
    <Modal title="Add Library" open={open} onOk={onOk}>
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
