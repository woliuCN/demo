import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { Form, Row, Col, Input, Button, Table, Select, Modal, Radio,message } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons'
import {categoryTypes} from '../../api/config';
import { addTableData,modifyTableData,deleteTableDataItems} from '../../api/request';
const { Option } = Select;
const { TextArea } = Input;
function Content(props) {
    const {tableData,searching,refreshTableData} = props;
    const [selectedRow, setSelectedRow] = useState([]);//选中的表格内容
    const [visible, setVisible] = useState(false); //是否展示对话框
    const [title, setTitle] = useState("新增物资"); //对话框标题
    const [newTabaData,setNewTabaData] = useState([]); //修改后的表格内容
    const [initialValues,setInitialValues] = useState(''); //编辑表单初始化数据
    const [form] = Form.useForm();
    const [dialogForm] = Form.useForm(); //弹框表单
    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
        },
        {
            title: '物资品名',
            dataIndex: 'name',
        },
        {
            title: '规格/型号',
            dataIndex: 'model',
        },
        {
            title: '储备类型',
            dataIndex: 'type',
        },
        {
            title: '是否有效',
            dataIndex: 'enable',
        },
        {
            title: '排序',
            dataIndex: 'sorting',
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => <Button size="small" type="primary" onClick={() => handleEndit(text)}>编辑</Button>
        },
    ];

    useEffect(()=>{
        let data = [];
        tableData.map((item,index)=>{
            data.push({
                key: index,
                index: index + 1,
                ...item
            });
        })
        setNewTabaData(data)
    },[tableData])
    useEffect(() => {
        if (visible) {
          dialogForm.setFieldsValue(initialValues);
          if(title==='新增物资'){
            dialogForm.resetFields();
          }
        }
      }, [visible]);    
    //模糊搜索查询
    const handleSearch = ()=>{
        let model = form.getFieldValue('model')||'';
        let enable = form.getFieldValue('enable')||'';
        searching(model,enable)
    }
    //编辑
    const handleEndit = value => {
        setTitle('修改物资');
        setInitialValues(value);
        setVisible(true);
    };
    //删除
    const handleDelete = ()=>{
        if(selectedRow.length<=0){
            message.error('请最少勾选一项');
            return;
        }

        Modal.confirm({
            title:"确认框",
            content:"确定删除勾选内容吗?",
            onOk:()=>{
                let length = selectedRow.length;
                let promiseArray = [];
                for(let i =0;i<length;i++){
                    promiseArray.push(deleteTableDataItems(selectedRow[i].id));
                 
                }
                Promise.all(promiseArray).then(()=>{
                    message.success("删除成功!");
                    refreshTableData();
                })
            }
        })
       
    }
   
    //选择表单列表事件
    const onSelectChange = (selectedRow,extra) => {
        setSelectedRow(extra)
    };

    //表单对话框确认事件
    const handleOk = e => {
        dialogForm
            .validateFields()
            .then(values => {
                if(title=='新增物资'){
                    values.createTime = new Date().toLocaleDateString().replace(/\//g,'-');
                    values.id = new Date().getTime()+'';
                    addTableData(JSON.stringify(values)).then((res)=>{
                        setVisible(false)
                        message.success('添加成功!',2);
                        refreshTableData();
                    }).catch((err)=>{
                        message.error("添加失败");
                    })
                }else{
                    let id = values.id;
                    modifyTableData(id,JSON.stringify(values)).then(res=>{
                        setVisible(false)
                        message.success('修改成功!',2);
                        refreshTableData();
                    }).catch((err)=>{
                        message.error("修改失败");
                    })
                }
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = e => {
        setVisible(false)
    };
    const rowSelection = {
        onChange: onSelectChange,
    };
    return (
        <div className="container">
            <Form
                form={form}
                {...layout}
                name="search"
                className="ant-advanced-search-form"
            >
                <Row gutter={24}>
                    <Col span={12} key="1">
                        <Form.Item
                            name="model"
                            label="规格型号"
                        >
                            <Input placeholder="请输入规格型号" />
                        </Form.Item>
                    </Col>
                    <Col span={12} key="2" style={{ padding: 0 }}>
                        <Form.Item
                            name="enable"
                            label="是否有效"
                        >
                            <Select placeholder="请选择是否有效" >
                                <Option value="是">是</Option>
                                <Option value="否">否</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col
                        span={12}
                    />
                    <Col
                        span={12}
                        style={{
                            textAlign: 'left',
                            paddingLeft: '8px'
                        }}
                    >
                        <Button size="small" type="primary" htmlType="submit"
                            onClick ={handleSearch}
                        >
                            查询
                        </Button>
                        <Button
                            size="small"
                            style={{
                                marginLeft: 8,
                            }}
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            重置
                     </Button>
                    </Col>
                </Row>
            </Form>
            <Row>
                <Col
                    span={12}
                >
                    <Button
                        size="small"
                        type="primary"
                        style={{ marginRight: "10px" }}
                        onClick={() => {setTitle("新增物资");setInitialValues({});setVisible(true)}}
                    >新增</Button>
                    <Button size="small" danger onClick={handleDelete}>删除</Button>
                </Col>
            </Row>
            <div className="table-container">
                <div className="tips">
                    <InfoCircleFilled style={{ color: "#1890ff" }} />
                     已选择
                     <span>{selectedRow.length}</span>项
                     <span>清空</span>
                </div>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={newTabaData}
                    size="small"
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        size: "small"
                    }}
                    scroll={{
                        scrollToFirstRowOnChange: true
                    }}
                />
            </div>
                <Modal
                forceRender
                title={title}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                okText="保存"
                cancelText="关闭"

            >
                <ModalForm form={dialogForm}  title={title}/>
            </Modal>
            
        </div>
    )
}
Content.defaultProps = {
    tableData: [],
    searching:()=>{},
    refreshTableData:()=>{}
}
Content.propType = {
    tableData: PropTypes.array,
    searching: PropTypes.func,
    refreshTableData: PropTypes.func
}

export default Content


function ModalForm(props) {
    const { form,title } = props
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const returnOptionValues = ()=>{
       return  categoryTypes.map(item=>{
            return  <Option value={item.value}>{item.key}</Option>
        })
    }
    return (
        <Form
            {...layout}
            form={form}
            name="form_in_modal"
            labelAlign="right"
        >
            <Row>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="物资品名"
                        rules={[
                            {
                                required: true,
                                message: '请输入物资品名',
                            },
                        ]}
                    
                    >
                        <Input disabled={title=='修改物资'?true:false}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="category"
                        label="物资类别"
                        rules={[
                            {
                                required: true,
                                message: '请选择物资类别',
                            },
                        ]}
                    >
                    <Select placeholder="请选择物资类别" disabled={title=='修改物资'?true:false}>
                        {
                            returnOptionValues()
                        }
                    </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name="measuringUnit"
                        label="计量单位"
                    >
                        <Input disabled={title=='修改物资'?true:false}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="model"
                        label="规格/型号"
                        rules={[
                            {
                                required: true,
                                message: '请输入规格/型号',
                            },
                        ]}
                    >
                        <Input placeholder="请输入规格/型号" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name="enable"
                        label="是否有效"
                        rules={[
                            {
                                required: true,
                                message: '请选择是否有效',
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value="否">否</Radio>
                            <Radio value="是">是</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="type"
                        label="储备类型"
                        rules={[
                            {
                                required: true,
                                message: '请选择储备类型',
                            },
                        ]}
                    >
                        <Select placeholder="请选择储备类型" >
                            <Option value="自储备">自储备</Option>
                            <Option value="他储备">他储备</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name="sorting"
                        label="排序"
                        rules={[
                            {
                                required: true,
                                message: '请输入排序号',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="weight"
                        label="重量"
                    >
                        <Input placeholder="请输入重量" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name="volume"
                        label="体积"
                    >
                        <Input placeholder="请输入体积" />
                    </Form.Item>
                </Col>
            </Row>
            <Row >
                <Col
                    span={24}
                >
                    <Form.Item
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        name="usefor"
                        label="物资用途"
                    >
                        <TextArea placeholder="请输入物资用途" />
                    </Form.Item>
                </Col>
            </Row>
            <Row style={{visibility:title=='修改物资'?'visible':'hidden'}}>
                <Col span={12}>
                    <Form.Item
                        name="createTime"
                        label="创建时间"
                    >
                        <Input disabled={true} />
                    </Form.Item>
                </Col>
                <Col span={12} style={{visibility:"hidden"}}>
                    <Form.Item
                        name="id"
                        label="id"
                    >
                        <Input  />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

