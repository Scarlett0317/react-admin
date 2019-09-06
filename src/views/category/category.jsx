import React from 'react';
import './category.less'
import { Card, Table, Button, Icon, message, Modal } from 'antd';
import AddForm from './add-form'
import UpdateForm from './update-form'
import { reqCategorys, reqSubCategorys ,reqUpdataCategory, reqAddCate} from '../../api/index'
//商品分类
class Category extends React.Component {
    state = {
        loading: false,
        categorys: [],
        subCategorys: [],//二级分类列表
        parentId: '0',//当前需要显示的分类列表的parentId
        parentName: '',
        showStatus:0,//标识天健更新的确认框是否显示,0是都不显示,1是显示添加,2是显示更新
    };
    componentWillMount() {
        this.columnsInit()
    }
    componentDidMount() {
        //发请求,执行异步任务,获取分类列表
        this.getList()
    }
    columnsInit() {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width: 200,
                render: (category) => (
                    <span className='action'>
                        <Button type="link" block
                            className='btn'
                            // 向事件回调函数传递参数:先定义一个匿名函数,在函数调用处理的函数并传入数据
                            onClick={ () => {this.showUpdate(category)} }>
                            修改分类
                        </Button>
                        {
                            this.state.parentId === '0' ?
                                <Button type="link" block
                                    className='btn'
                                    onClick={() => this.seeSort(category)}>
                                    查看子分类
                            </Button> : null
                        }
                    </span>
                )
            },
        ];

    }
    //parentId如果没有指定根据状态中的parentID请求,如果执行了,根据指定请求
    getList = async (parentId) => {
        //获取一级分类列表
        this.setState({ loading: true })
        parentId  = parentId || this.state.parentId;
        const result = await reqCategorys(parentId)
        this.setState({ loading: false })
        if (result.status === '0') {
            //此时可能包括一级也包括二级,需要根据parentId来判断是否是一级列别还是二级列表
            const categorys = result.data
            if (parentId === '0') {
                this.setState({
                    categorys,
                })
            } else {
                this.setState({
                    subCategorys: categorys
                })
            }
        } else {
            message("获取分类列表失败")
        }
    }
    getSubList = async () => {
        const { parentId } = this.state;
        const result = await reqSubCategorys(parentId)
        if (result.status === '0') {
            const subCategorys = result.data;
            this.setState({
                subCategorys,
            })
            if (parentId === result.parentId) {
                console.log(1)
            }
        } else {
            message("获取分类列表失败")
        }
    }
    seeSort = (category) => {
        this.setState({
            parentId: category.nameid,
            parentName: category.name
        }, () => {
            this.getSubList()
        })

    }
    showFirst = () => {
        //跳转到一级
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
        })
       
    }
    //显示添加确认的确认框
    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    }
    //显示修改的确认框
    showUpdate = (category) => {
        //保存分类对象
        this.category = category 
        this.setState({
            showStatus: 2
        })
    }
     //取消modal
    handleCancel=()=>{
        //清除输入数据
        this.form.resetFields()
        //隐藏弹框
        this.setState({
            showStatus:0
        })
    }
    //添加cate
    addCategory = async () => {
        this.setState({
            showStatus:0
        })
        const {categoryName, parentId } = this.form.getFieldsValue()
        this.form.resetFields()
        const result = await reqAddCate(categoryName,parentId)
        if(result.status === 0){
            //3.重新显示列表
            this.getList()
            this.getSubList()
        }
    }
    //更改cate,
    upDateCategory = async () => { 
        
        //1.关闭modal
        this.setState({
            showStatus:0
        })
        //准备数据

        const categoryId = this.category.nameid
        const {categoryName,parentId} = this.form.getFieldValue('categoryName')
        //重置
        //2.发请求更新,准备数据
        const result = await reqUpdataCategory({categoryId,categoryName})
        if(result.status === 0){
            //3.重新显示列表
            if(parentId === this.state.parentId){
                this.getList()
               
            }else if(parentId === '0'){//在二级列表下获取一级分类项,重新获取一级分类列表,但不需要显示一级分类列表
                this.setState({parentId:'0'},()=>{
                    this.getList('0')
                })
            }
            
        }
       
        
    }
    
    render() {
        const { categorys, subCategorys, parentId, parentName, loading , showStatus } = this.state
        const category = this.category || {}  //容错
        const title = parentId === '0' ? "一级分类列表" : (
            <span>
                <Button type="link" onClick={this.showFirst}>
                    一级分类列表
                    <Icon type="arrow-right" />
                    <span>{parentName}</span>
                </Button>
            </span>
        )
        return <div className='cate_box' style={{ backgroundColor: 'white', height: '100%' }}>
            <Card title={title}
                extra={
                    <Button type="primary" onClick={this.showAdd}>
                        <Icon type="plus" />
                        添加
                    </Button>
                }
                className='card_container'
            >
                <Table
                    className='table_box'
                    dataSource={parentId === "0" ? categorys : subCategorys}
                    rowKey='nameid'
                    columns={this.columns}
                    bordered
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                    loading={loading}
                />

                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm 
                        categorys={categorys} 
                        parentId={parentId} 
                        setForm = { form => {this.form = form}}
                    />
                </Modal>
                <Modal
                    title="更新分类"
                    visible={showStatus === 2}
                    onOk={this.upDateCategory}
                    onCancel={this.handleCancel} 
                >
                    <UpdateForm categoryName={category.name} setForm = { form => {this.form = form}}></UpdateForm>
                </Modal>
            </Card>
        </div>
    } 
}

export default Category