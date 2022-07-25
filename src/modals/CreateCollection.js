import React from 'react'
import {Modal, Form, Input, Button, message, Upload} from 'antd'

import {LoadingOutlined, PlusOutlined} from '@ant-design/icons'
import request from '../request'

import bus from '../bus';

import './CreateCollection.less';

class CreateCollectionModal extends React.PureComponent {
    state = {
        visible: false,
        imageUrl: '',
        loading: false
    }

    cover_file = ''

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

    getBase64(img, callback)  {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      };    
    
      onFinish(values) {
        console.log('Success:', values);
    
        request.post('/collection/create', {name: values.name, desc: values.desc, cover_file: this.cover_file}).then((res) => {
            message.success("创建成功")
            this.closeModal()
        })
      };
    
      beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
      
        const isLt2M = file.size / 1024 / 1024 < 2;
      
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
      
        return isJpgOrPng && isLt2M;          
      }

      handleChange(info) {
        if (info.file.status === 'uploading') {
            return;
          }
      
          if (info.file.status === 'done') {
            this.cover_file = info.file.response
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, (url) => {
                this.setState({
                    loading: false,
                    imageUrl: url
                })
            });
          }         
      }
    render() {

        const uploadButton = (
            <div>
              {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          );

        return (
            <Modal title="创建新专辑" visible={this.state.visible} footer={null} onCancel={this.closeModal.bind(this)} className="modal-create-collection">
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
                        label="专辑头像"
                        name="file"
                        rules={[
                        {
                            required: false,
                        },
                        ]}
                    >
<Upload.Dragger 
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="http://localhost:9001/upload"
      beforeUpload={this.beforeUpload}
      onChange={this.handleChange.bind(this)}
    >
      {this.state.imageUrl ? (
        <img
          src={this.state.imageUrl}
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload.Dragger>
                    </Form.Item>                        
                    <Form.Item
                        label="专辑名称"
                        name="name"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>                        
                    <Form.Item
                        label="专辑描述"
                        name="desc"
                        rules={[
                        {
                            required: false,
                            message: '',
                        },
                        ]}
                    >
                        <Input.TextArea rows={5} />
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

export default CreateCollectionModal