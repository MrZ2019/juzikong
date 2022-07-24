

import request from '../request'

import { useState, useEffect, useRef } from 'react'

import { Button, Modal, Input } from 'antd'

import { useParams } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import './list.css'
import bus from '../bus';

const List = ({type, tag}) => {

    const [rows, setRows] = useState([])

    const [showEditModal, setShowEditModal] = useState(false)
    const [contentValue, setContentValue] = useState('')
    const contentRef = useRef(null)

    const [editID, setEditID] = useState(0)

    const fetchList = () => {
        let api

        if (type == 'list') {
            api = '/list'
        } else if (type == 'tag') {

            api = `/tag/${tag}`
        } else {
            setRows([])
            return
        }
        request.get(api).then((res) => {
            console.log(res)
            setRows(res)
        }).catch(() => {
            setRows([])
        })
    }
    useEffect(() => {
        fetchList()
    }, [tag, type])
    useEffect(() => {
        bus.on('fetch-list', () => {
            fetchList()
        })
        
    }, [])


    const remove = (item) => {
        Modal.confirm({
            title: '确认删除',
            icon: <ExclamationCircleOutlined />,
            content: 'Bla bla ...',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                request.get('/remove?id=' + item.id).then(() => {
                    fetchList()
                })
            }
        });
    };

    const showEdit = (item) => {
        setShowEditModal(true)
        setEditID(item.id)
        setContentValue(item.content)
        
    };

    const confirmEdit = () => {
        request.post('/edit', {id: editID, content: contentValue}).then(() => {
            fetchList()
            setShowEditModal(false)
        })
    }

    const onContentChange = (event) => {
        setContentValue(event.target.value)
    }
    return (
        <div>
            {/* <h1>{title}</h1> */}
            {
                rows.map((item) =>
                    <div className="item">
                        <h1 className="content">{item.content}</h1>
                        <Button type="link" onClick={() => remove(item)}>删除</Button>
                        <Button type="link" onClick={() => showEdit(item)}>编辑</Button>
                    </div>
                )
            }
            <Modal title="编辑" visible={showEditModal} onOk={confirmEdit} onCancel={() => {setShowEditModal(false)}}>
                <Input.TextArea placeholder="content" onChange={onContentChange} ref={contentRef} value={contentValue} rows="6"/>
            </Modal>
        </div>
    )
}

export default List