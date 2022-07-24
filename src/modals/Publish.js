import React from 'react'
import {Modal, Form, Input, Button, message} from 'antd'

import request from '../request'

import bus from '../bus';

class PublishModal extends React.PureComponent {
    state = {
        visible: false
    }

    showModal() {
        this.setState({
            visible: true
        })
    }
    closeModal() {
        this.setState({
            visible: false
        })
    }
    onFinish(values) {
        console.log('Success:', values);
    
        request.post('/add', {content: values.content, tags: values.tags}).then((res) => {
            console.log(res)
            bus.emit('fetch-list')
            message.success("发布成功")
            this.closeModal()
        })
      };
      
    render() {
        return (
            <Modal title="发布" visible={this.state.visible} footer={null} onCancel={this.closeModal.bind(this)}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish.bind(this)}
                    autoComplete="off"
                    >
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[
                        {
                            required: true,
                            message: '',
                        },
                        ]}
                    >
                        <Input.TextArea rows={5} />
                    </Form.Item>
                    <Form.Item
                        label="标签"
                        name="tags"
                        rules={[
                        {
                            required: false,
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
                        确定
                        </Button>
                    </Form.Item>
                    </Form>               
            </Modal>)
    }
}

export default PublishModal