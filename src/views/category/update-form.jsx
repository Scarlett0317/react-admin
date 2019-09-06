import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
class UpdateForm extends React.Component {
    static propTypes = {
        categoryName : PropTypes.string.isRequired,
        setForm : PropTypes.func.isRequired
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render() {
        const {categoryName} = this.props;
        const { getFieldDecorator } = this.props.form;
        return <Form className=''>
            <Form.Item>
                {
                    getFieldDecorator('categoryName', {
                        initialValue: categoryName
                    })(
                        <Input placeholder='请输入分类名称' />
                    )
                }
            </Form.Item>
        </Form>;
    }
}

export default Form.create()(UpdateForm)