import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Checkbox ,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, Table, Modal, message, Badge, Divider,Popconfirm  } from 'antd';
import Ellipsis from '../../components/Ellipsis';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from '../List/TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleAdd, handleModalVisible, website,rowRecord,dimPageType } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {

      console.log("fieldsValue",fieldsValue)

      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="添加站点的页面类型"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="站点/平台"
      >
        {form.getFieldDecorator('webSiteId', {
          initialValue: rowRecord.webSiteId,
          rules: [{ required: true, message: '请选择站点/平台' }],
        })(
          <Select placeholder="请选择站点/平台" style={{ width: '100%' }}>
            {
              website.map(function (item) {
                return <Option key={item.websiteId} value={item.websiteId}>{item.websiteName}</Option>
              })
            }
          </Select>
        )}
      </FormItem>

      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="页面类型"
      >
        {form.getFieldDecorator('pageTypeCode', {
          initialValue: rowRecord.pageTypeCode,
          rules: [{ required: true, message: '请选择页面类型' }],
        })(
          <Select placeholder="请选择页面类型" style={{ width: '100%' }}>
            {
              dimPageType.map(function (item) {
                return <Option key={item.pageTypeCode} value={item.pageTypeCode}>{item.pageTypeName}</Option>
              })
            }
          </Select>
        )}
      </FormItem>

      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="正则"
      >
        {form.getFieldDecorator('regexInfo', {
          initialValue: rowRecord.regexInfo,
          rules: [{ required: true, message: '请输入正则表达式' }],
        })(
          <Input placeholder="请输入正则表达式" />
        )}
      </FormItem>

      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="脚本正则"
      >
        {form.getFieldDecorator('scriptRegexInfo', {
          initialValue: rowRecord.scriptRegexInfo,
          rules: [{ required: true, message: '请输入脚本正则表达式' }],
        })(
          <Input placeholder="请输入脚本正则表达式" />
        )}
      </FormItem>

      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="URL截取规则"
      >
        {form.getFieldDecorator('urlCutRule', {
          initialValue: rowRecord.urlCutRule,
          rules: [{ required: true, message: '请输入URL截取规则' }],
        })(
          <Input placeholder="请输入URL截取规则" />
        )}
      </FormItem>

      <FormItem
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 15 }}
      label="数据使用域"
    >
      {form.getFieldDecorator('pluginStatus', {
        initialValue: rowRecord.pluginStatus,
        rules: [{ required: true, message: '请选择数据使用域' }],
      })(
        <Checkbox.Group>
          <Row>
            <Col span={20}>
              <Checkbox value="1" >插件使用</Checkbox>
              <Checkbox value="2" >Traffic使用</Checkbox>
            </Col>
            <Col span={20}>
              <Checkbox value="3">邮件使用</Checkbox>
              <Checkbox value="4">脚本使用</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
        )}
    </FormItem>


    </Modal>
  );
});

@connect(({ pagetype, loading }) => ({
  pagetype,
  loading: loading.models.pagetype,
}))
@Form.create()
export default class PageTypeList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    rowRecord: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'pagetype/fetch',
    });
    dispatch({
      type: 'pagetype/loadWebsite',
    });
    dispatch({
      type: 'pagetype/loadPageType',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'pagetype/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'pagetype/fetch',
      payload: {},
    });
  }

  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'pagetype/remove',
          payload: {
            no: selectedRows.map(row => row.id).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  }

/*  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }*/

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'pagetype/fetch',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
      rowRecord: {},
    });
  }

  handleAdd = (fields) => {
    let recordId = this.state.rowRecord.id;
    let dispatchType = 'pagetype/add';
    let msg = '添加成功';
    if (typeof(recordId) !== "undefined" && recordId !== null && recordId !== "") {
      dispatchType = 'pagetype/modify';
      msg = '修改成功';
    }

    this.props.dispatch({
      type: dispatchType,
      payload: {
        ...this.state.rowRecord,
        ...fields
      },
      callback: (response) =>{
        if(response && response.success){
          if(response.data == "EXISTS") {
            message.error("存在相同站点及页面类型数据.");
          } else {
            message.success(msg);
            this.setState({
              modalVisible: false,
            });
          }
        }else{
          message.error(response.msg);
        }
      },
    });
  }

  handleModify = (record)=>{
    this.setState({
      modalVisible: true,
      rowRecord: record,
      modalTitle: "修改页面类型",
    });
  }

  handleDelete = (record)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'pagetype/delete',
      payload:{id: record.id},
      callback: (response) =>{
        if(response && response.success){
          message.success("删除成功");
        }else{
          message.error(response.msg);
        }
      },
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="站点/平台">
              {getFieldDecorator('webSiteId')(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                {
                  this.props.pagetype.website.map(function (item) {
                    return <Option key={item.websiteId} value={item.websiteId}>{item.websiteName}</Option>
                  })
                }
              </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="页面类型">
              {getFieldDecorator('pageTypeCode')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {
                    this.props.pagetype.dimPageType.map(function (item) {
                      return <Option key={item.pageTypeCode} value={item.pageTypeCode}>{item.pageTypeName}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return  this.renderSimpleForm();
  }

  render() {
    const { pagetype: { data, website,dimPageType }, loading } = this.props;
    const { selectedRows, modalVisible,rowRecord } = this.state;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...data.pagination,
    };

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const columns = [
      {
        title: '站点/平台',
        dataIndex: 'webSiteInfo',
      },
      {
        title: '页面类型',
        dataIndex: 'pageTypeName',
      },
      {
        title: '正则',
        dataIndex: 'regexInfo',
        render: val => <span><Ellipsis tooltip length={20}>{val}</Ellipsis></span>,
      },
      {
        title: '脚本正则',
        dataIndex: 'scriptRegexInfo',
        render: val => <span><Ellipsis tooltip length={20}>{val}</Ellipsis></span>,
      },
      {
        title: '截取规则',
        dataIndex: 'urlCutRule',
      },
      {
        title: '数据使用域',
        dataIndex: 'statusName',
      },
      {
        title: '修改时间',
        dataIndex: 'lastModifyTime',
        sorter: false,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleModify(record)}>修改</a>
            <Divider type="vertical" />
            <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record)}>
              <a href="#">删除</a>
            </Popconfirm>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderLayout title="">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Dropdown overlay={menu}>
                      <Button>
                        批量操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                )
              }
            </div>
{/*            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />*/}
            <Table
              loading={loading}
              rowKey={record => record.id}
              dataSource={data.list}
              columns={columns}
              pagination={paginationProps}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
          website={website}
          rowRecord={rowRecord}
          dimPageType={dimPageType}
        />
      </PageHeaderLayout>
    );
  }
}
