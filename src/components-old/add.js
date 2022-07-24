import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';

import request from '../request'

import bus from '../bus';

const Add = () => {
  const onFinish = (values) => {
    console.log('Success:', values);

    request.post('/add', {content: values.content, tags: values.tags}).then((res) => {
        console.log(res)
        bus.emit('fetch-list')
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 2,
      }}
      wrapperCol={{
        span: 6,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Content"
        name="content"
        rules={[
          {
            required: true,
            message: 'Please input your content!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tags"
        name="tags"
        rules={[
          {
            required: false,
            message: 'Please input your tags!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 2,
          span: 2,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Add