import React from 'react';
import { Form, Select, Input, } from 'antd';
import PropTypes from 'prop-types';
const { Option } = Select;
class AddForm extends React.Component {
    static propsTypes ={
        categorys: PropTypes.string.isRequired,
        parentId : PropTypes.string.isRequired,
        setForm : PropTypes.func.isRequired,
    } 
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render() {
        const {categorys, parentId} = this.props
        const { getFieldDecorator } = this.props.form;
        return <Form className=''>
            <Form.Item>
                {
                    getFieldDecorator('parentId', {
                        initialValue: parentId
                })(
                    <Select>
                        <Option value="0">一级分类</Option>
                        {
                            categorys.map(c =>  <Option value={c.nameid} key={c.nameid}>{c.name}</Option>)
                        }
                        
                    </Select>
                )}
            </Form.Item>
            <Form.Item>
                {
                    getFieldDecorator('categoryName', {
                        initialValue: ''
                    })(
                        <Input placeholder='请输入分类名称' />
                    )
                }
            </Form.Item>
        </Form>;
    }
}

export default Form.create()(AddForm)