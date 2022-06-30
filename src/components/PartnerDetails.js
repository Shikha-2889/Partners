import React, { useCallback, useState, useEffect } from 'react';
import { Button, Drawer, Divider, Form, Select, Input, Radio, Row, Space } from 'antd'
import 'antd/dist/antd.min.css'
import FormItem from 'antd/lib/form/FormItem';

const { Option } = Select


const PartnerDetail = (props) => {
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState([])
    const [fieldvisible, setfieldVisible] = useState(false)
    const [showhide, setShowHide] = useState(true)
    const [form] = Form.useForm()

    const showDrawer = () => {
        setVisible(true)

    }

    const onClose = () => {
        setVisible(false)
        form.resetFields()
    }

    const showDetails = () => {
        setShowHide(false)

    }

    const handleTypeChange = (value) => {
        console.log(`selected ${value}`)
         value === '2' ? setfieldVisible(true) : setfieldVisible(false)

    }

    const handleFormSubmit = async (values) => {
        const company_name = values.company_name
        console.log(values)
        try {
            let response = await fetch('http://partners.webologixglobal.com/api/v1/users/partners/',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },

                    method: 'post',
                    body: JSON.stringify(values)
                })
            console.log(response.status)
        }

        catch (err) {
            console.log(err)
        }

    }


    const getData = async () => {
        fetch('http://partners.webologixglobal.com/api/v1/users/partners/?email=xyz1234@gmail.com',
            {
                method: 'get'

            })
            .then(response => { console.log(response) })
            .then(data => { console.log(data) })
            .catch(error => { console.log(error) })

    }

    useEffect(()=>{
        getData()
    })







    return (
        <>
            <Button type="primary" onClick={showDrawer}>Add New</Button>
            <Drawer
                title="Add New Partner"
                width="45%"
                visible={visible}
                closable={true}
                onClose={onClose}
            >

                <Form
                    name="Partnersbasic"
                    form={form}
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    labelWrap
                    labelAlign='left'
                    onFinish={(values) => handleFormSubmit(values)}
                >

                    <Form.Item
                        name="type"
                        label="Type"

                        rules={[
                            {
                                required: true,
                                message: 'Please choose the type of Partner!',
                            },
                        ]}
                    >
                        <Select
                            autoFocus
                            style={{ width: '50%' }}
                            onChange={handleTypeChange}
                        >
                            <Option value="2">Franchise</Option>
                            <Option value="1">Junction</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="companyName"
                        label="Company Name"
                        hasFeedback
                        rules={[{
                            required: true,
                            message: "Please enter the company's name"
                        }]}
                    >
                        <Input></Input>
                    </Form.Item>

                    <Form.Item
                        name="first_name"
                        label="Owner's First Name"
                        hasFeedback
                        rules={[{
                            required: true,
                            message: "Please enter the First name"
                        }]}
                    >
                        <Input></Input>
                    </Form.Item>

                    <Form.Item
                        name="last_name"
                        label="Owner's Last Name"
                        hasFeedback
                        rules={[{
                            required: true,
                            message: "Please enter the Last name"
                        }]}
                    >
                        <Input></Input>
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Contact Number"
                        hasFeedback
                        rules={[{
                            required: true,
                            message: "Please enter the mobile number"
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                const pattern = /^[6-9]\d{9}$/
                                if (!value || pattern.test(value) == true) {
                                    return Promise.resolve()
                                }
                                else {
                                    return Promise.reject("Please enter 10 digits mobile number")
                                }
                            }
                        })

                        ]}
                    >
                        <Input></Input>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email"
                            },
                            {
                                type: "email",
                                message: "Please enter a valid email"
                            }
                        ]}
                    >
                        <Input type='email'></Input>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password"
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    const pattern = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
                                    if (!value || (value.length > 6 && value.length < 16)|| pattern.test(value)==true) {
                                        return Promise.resolve()
                                    }
                                    else {
                                        return Promise.reject("Password is too weak ! Please enter a combination of uppercase,lowercase letters and digits")
                                    }
                                }
                            })

                        ]}

                    >
                        <Input type='password'></Input>

                    </Form.Item>

                    <Form.Item
                        name="website"
                        label="Website"
                        hasFeedback
                        rules={[{
                            type: "url",
                            message: "Please enter a valid url"
                        }]}
                    >
                        <Input placeholder='Please enter the url,   ex: http://example.com'></Input>
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label='Address'
                        hasFeedback
                        rules={[{
                            required: true,
                            message: "Please enter the address"

                        },

                        {
                            max: 500,
                            message: "address cannot exceed 500 characters"
                        }]}

                    >
                        <Input.TextArea showCount maxLength={900} autoSize></Input.TextArea>
                    </Form.Item>

                    <Form.Item
                        name="establishedIn"
                        label="Year of Establishment"
                        hasFeedback
                        rules={[{
                            required: true,
                            message: "Please enter the year of establishment"
                        }]}>
                        <Input></Input>

                    </Form.Item>

                    <Form.Item
                        name="gst"
                        label="GST"
                        hasFeedback
                    >
                        <Input></Input>

                    </Form.Item>


                    <Form.Item name="operation" label="PartTime/Full Time">
                        <Select>
                            <Option value="2">Part Time</Option>
                            <Option value="1">Full Time</Option>
                        </Select>

                    </Form.Item>


                    <Form.Item
                        name="dropRatio"
                        label="Drop Ratio of Students"
                        hidden={fieldvisible}
                        hasFeedback
                    >
                        <Input></Input>
                    </Form.Item>

                    <Form.Item
                        name="competition"
                        label="Competitors Near By"
                        hasFeedback
                    >
                        <Input.TextArea showCount maxLength={900} autoSize></Input.TextArea>
                    </Form.Item>

                    <Form.Item
                        name="classesCovered"
                        label="Classes/Courses covered"
                        hidden={fieldvisible}
                        hasFeedback
                    >
                        <Input.TextArea showCount maxLength={900} autoSize></Input.TextArea>
                    </Form.Item>

                    <Form.Item
                        name="students"
                        label="Number of Students"
                        hidden={fieldvisible}
                        hasFeedback
                    >
                        <Input.TextArea showCount maxLength={900} autoSize></Input.TextArea>
                    </Form.Item>

                    <Form.Item
                        name="avgFee"
                        label="Average Fee per student"
                        hidden={fieldvisible}
                        hasFeedback
                    >
                        <Input></Input>
                    </Form.Item>

                    <Divider orientation='left' hidden={fieldvisible}>Expenses</Divider>

                    <Form.Item
                        name="monthlyExpense"
                        label="Monthly Expenses of the Institute"
                        hidden={fieldvisible}
                        hasFeedback
                    >
                        <Input.TextArea showCount maxLength={900} autoSize></Input.TextArea>
                    </Form.Item>

                    <Form.Item
                        name="facultyExpense"
                        label="Salary Expenses of Faculties"
                        hidden={fieldvisible}
                        hasFeedback
                    >
                        <Input.TextArea showCount maxLength={900} autoSize></Input.TextArea>
                    </Form.Item>

                    <Form.Item
                        name="brandAdvExpense"
                        label="Branding and Advt.Expenses"
                        hidden={fieldvisible}
                        hasFeedback
                    >
                        <Input.TextArea showCount maxLength={900} autoSize></Input.TextArea>
                    </Form.Item>

                    <Form.Item
                        name="ltvStrategy"
                        label="Doing Anything to increase the LTV?">

                        <Input.TextArea showCount maxLength={900} autoSize></Input.TextArea>
                    </Form.Item>

                    <Divider></Divider>
                    <Row justify='end'>
                        <Space size="large">
                            <Button type="primary" htmlType='submit'>Submit</Button>
                            <Button danger onClick={onClose}>Cancel</Button>
                            <Button style={{ margin: '0 8px', }} onClick={() => { form.resetFields() }}> Reset</Button>
                        </Space>
                    </Row>

                </Form>
            </Drawer>


        </>
    )

}

export default PartnerDetail