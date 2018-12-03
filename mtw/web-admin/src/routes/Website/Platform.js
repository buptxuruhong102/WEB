import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Table, Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider,Popconfirm } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from '../List/TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');


const CreateForm = Form.create()((props) => {
  const { modalTitle, modalVisible, form, handleAdd, handleModalVisible,rowRecord,websiteList,platformList } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  const cancelHandle = () => {
    form.resetFields();
    handleModalVisible();
  };
  return (
    <Modal
      title={modalTitle}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={cancelHandle}
    >
      <FormItem
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 15 }}
      label="站点名称"
    >
      {form.getFieldDecorator('webSiteCode', {
        initialValue: rowRecord.webSiteCode,
        rules: [{ required: true, message: '请输入站点编码' }],
      })(
        <Select placeholder="请选择" style={{ width: '100%' }}>
          {
            websiteList.map(function (item) {
              return <Option key={item.webSiteCode} value={item.webSiteCode}>{item.webSiteName}</Option>
            })
          }
        </Select>
      )}
    </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="平台名称"
      >
        {form.getFieldDecorator('platformCode', {
          initialValue: rowRecord.platformCode,
          rules: [{ required: true, message: '请输入平台编码' }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            {
              platformList.map(function (item) {
                return <Option key={item.platformCode} value={item.platformCode}>{item.platformName}</Option>
              })
            }
          </Select>
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="站点ID"
      >
        {form.getFieldDecorator('webSiteId', {
          initialValue: rowRecord.webSiteId,
          rules: [{ required: true, message: '请输入站点ID,数值类型',pattern: /^[0-9]+$/ }],
        })(
          <Input placeholder="请输入" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="站点首页URL"
      >
        {form.getFieldDecorator('indexUrl', {
          initialValue: rowRecord.indexUrl,
          rules: [{ required: true, message: '请输入站点首页URL' }],
        })(
          <Input placeholder="请输入" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="站点正则"
      >
        {form.getFieldDecorator('webSiteRegex', {
          initialValue: rowRecord.webSiteRegex,
          rules: [{ required: true, message: '请输入站点正则' }],
        })(
          <Input placeholder="请输入" />
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ platform, loading }) => ({
  platform,
  loading: loading.models.platform,
}))
@Form.create()
export default class PlatformList extends PureComponent {
  state = {
    modalTitle: "新建平台",
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    rowRecord: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'platform/fetch',
    });
    dispatch({
      type: 'platform/getWebsiteList',
    });
    dispatch({
      type: 'platform/getPlatformList',
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
      type: 'platform/fetch',
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
      type: 'platform/fetch',
      payload: {},
    });
  }

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
        type: 'platform/fetch',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
      rowRecord:{},
      modalTitle: "新建平台",
    });
  }

  handleAdd = (fields) => {
    this.props.dispatch({
      type: 'platform/add',
      payload: {
        ...this.state.rowRecord,
        ...fields,
      },
      callback: (response) =>{
        if(response.success){
          message.success(response.msg);
        }else{
          message.error(response.msg);
        }
      },
    });
    this.setState({
      modalVisible: false,
    });
  }

  onDelete = (record)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'platform/delete',
      payload:{id: record.platformId},
      callback: (response) =>{
        if(response && response.success){
          message.success("删除成功");
        }else{
          message.error(response.msg);
        }
      },
    });
  }

  onModify = (record)=>{
    console.log(record)
    this.setState({
      modalVisible: true,
      rowRecord: record,
      modalTitle: "修改平台",
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="站点名称">
              {getFieldDecorator('webSiteCode')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {
                    this.props.platform.websiteList.map(function (item) {
                      return <Option key={item.webSiteCode} value={item.webSiteCode}>{item.webSiteName}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="平台名称">
              {getFieldDecorator('platformCode')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {
                    this.props.platform.platformList.map(function (item) {
                      return <Option key={item.platformCode} value={item.platformCode}>{item.platformName}</Option>
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

  render() {
    const { platform: { data:{list, pagination}, websiteList, platformList }, loading } = this.props;
    const { modalVisible, rowRecord, modalTitle } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const columns = [
      {
        title: '站点名称',
        dataIndex: 'webSiteCode',
        width: "10%",
        render: (text, record) =>{
          let website = websiteList.find((item)=>{
              return record.webSiteCode === item.webSiteCode;
          });
          return website && website.webSiteName || "";
        }
      },
      {
        title: '平台名称',
        dataIndex: 'platformCode',
        width: "10%",
        render: (text, record) =>{
          let platform = platformList.find((item)=>{
            return record.platformCode === item.platformCode;
          });
          return platform && platform.platformName || "";
        }
      },
      {
        title: '站点ID',
        dataIndex: 'webSiteId',
        width: "8%",
      },
      {
        title: '站点首页URL',
        dataIndex: 'indexUrl',
      },
      {
        title: '站点正则',
        dataIndex: 'webSiteRegex',
      },
      {
        title: '修改人',
        dataIndex: 'lastModifyUser',
      },
      {
        title: '修改时间',
        dataIndex: 'lastModifyTime',
        width: "18%",
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        width: "12%",
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.onModify(record)}>修改</a>
            <Divider type="vertical" />
            <Popconfirm title="确定删除?" onConfirm={() => this.onDelete(record)}>
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
              {this.renderSimpleForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
            </div>
            <Table
              loading={loading}
              rowKey={record => record.platformId}
              dataSource={list}
              columns={columns}
              pagination={paginationProps}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
          rowRecord={rowRecord}
          modalTitle={modalTitle}
          websiteList={websiteList}
          platformList={platformList}
        />
      </PageHeaderLayout>
    );
  }
}
