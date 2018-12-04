import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Input, InputNumber, Select, Button, Table, Modal, message, Divider, Popconfirm } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';

import styles from '../List/TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const CreateForm = Form.create()((props) => {
  const { modalTitle, modalVisible, form, handleAdd, handleModalVisible, rowRecord, areaGroupList } = props;
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
      <#list columnInfoList as column>
      <#if !column.primaryKey>
      <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="${column.propertyName}"
      >
          {form.getFieldDecorator('${column.propertyName}', {
              initialValue: rowRecord.${column.propertyName},
              rules: [{ required: true, message: '请输入站点名称(前后不能有空格)',pattern: /^[\S]+$/ }],
          })(
              <Input placeholder="请输入" />
          )}
      </FormItem>
    </#if>
    </#list>
    </Modal>
  );
});

@connect(({ ${modelNameLowerCamel}, loading }) => ({
    ${modelNameLowerCamel},
  loading: loading.models.${modelNameLowerCamel},
}))
@Form.create()
export default class ${modelNameUpperCamel} extends PureComponent {
  state = {
    modalTitle: "新建站点",
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    rowRecord: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: '${modelNameLowerCamel}/fetch',
    });
  }

  refreshTable = () => {
    const { dispatch } = this.props;
    dispatch({
      type: '${modelNameLowerCamel}/fetch',
    });
  }

  handleTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${r"${sorter.field}_${sorter.order}"}`;
    }

    dispatch({
      type: '${modelNameLowerCamel}/fetch',
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
      type: '${modelNameLowerCamel}/fetch',
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
        type: '${modelNameLowerCamel}/fetch',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
      rowRecord:{},
      modalTitle: "新建站点",
    });
  }

  handleAdd = (fields) => {
    let id = this.state.rowRecord.id;
    let _type = '${modelNameLowerCamel}/add';
    if(id){
      _type = '${modelNameLowerCamel}/modify';
    }
    this.props.dispatch({
      type: _type,
      payload: {
        ...this.state.rowRecord,
        ...fields,
      },
      callback: (response) =>{
        if(response.code == 200){
          if(response.data == 'EXISTS') {
            message.error("站点名称已存在");
          } else {
            message.success("保存成功");
            this.setState({
              modalVisible: false,
            });
            this.refreshTable();
          }
        }else{
          message.error(response.msg);
        }
      },
    });

  }

  onDelete = (record)=>{
    const { dispatch } = this.props;
    dispatch({
      type: '${modelNameLowerCamel}/delete',
      payload:{id: record.id},
      callback: (response) =>{
        if(response && response.code == 200){
          message.success("删除成功");
          this.refreshTable();
        }else{
          message.error(response.msg);
        }
      },
    });
  }

  onModify = (record)=>{
    this.setState({
      modalVisible: true,
      rowRecord: record,
      modalTitle: "修改站点",
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <#list columnInfoList as column>
          <#if column_index gt 0 && column_index lt 3>
          <Col md={8} sm={24}>
            <FormItem label="${column.propertyName}">
                {getFieldDecorator('${column.propertyName}')(
                    <Input placeholder="请输入" />
                )}
            </FormItem>
          </Col>
          </#if>
        </#list>

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
    return this.renderSimpleForm();
  }

  render() {
    const { ${modelNameLowerCamel}: { data, areaGroups }, loading } = this.props;
    const { modalVisible, rowRecord, modalTitle } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    //分页信息
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: data.pageNum,
      pageSize: data.pageSize,
      total: data.total,
    };

    const columns = [
      <#list columnInfoList as column>
        {
            title: '${column.propertyName}',
            dataIndex: '${column.propertyName}',
        },
      </#list>
      {
        title: '操作',
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
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
            </div>
            <Table
              loading={loading}
              rowKey={record => record.id}
              dataSource={data.list}
              columns={columns}
              pagination={paginationProps}
              onChange={this.handleTableChange}
            />
          </div>
        </Card>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
          rowRecord={rowRecord}
          modalTitle={modalTitle}
          areaGroupList={areaGroups}
        />
      </PageHeaderLayout>
    );
  }
}
