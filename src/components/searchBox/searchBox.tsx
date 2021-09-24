import React, { FC } from 'react';
import { Input, Form } from 'antd';

const { Search } = Input;

interface Props {
    onChange: (input: string) => void,
    children?: React.ReactNode
}
const SearchBox: FC<Props> = ({ onChange: onChangeInput }) => {
  const [form] = Form.useForm();

  return (
    <Form layout="vertical" form={form}>
      <Search style={{ width: '100%' }} onChange={(input) => onChangeInput(input.target.value)} />
    </Form>
  );
};

export default SearchBox;
