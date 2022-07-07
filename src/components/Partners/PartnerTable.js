import React from 'react';
import { Table } from 'antd';
import { partnersUrl } from '../../config/config';
import PartnerDetail from './PartnerDetails';


const PartnerTable = (props) => {
    const [data, setData] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        page: 1,
        results: 3,

    })

    const col = [
        {
            title: 'Type',
            dataIndex: "type"
        },
        {
            title: 'Company Name',
            dataIndex: "companyName",
        },
        {
            title: 'Name of Owner',
            dataIndex: "user",
            render: (item) => { return <p>{item.first_name + " " + item.last_name}</p> }
        },
        {
            title: 'Contact Number',
            dataIndex: "phone"
        },
        {
            title: 'Email',
            dataIndex: "user",
            render: item => item.email
        },
        {
            title: 'Address',
            dataIndex: "address"
        },
        {
            title: 'Year of Establishment',
            dataIndex: "establishedIn"
        },

    ]

    const getData = (params) => {

        fetch(partnersUrl + `?results=${params["results"]}&page=${params["page"]}`).then(response => {
            if (response.status === 200) {
                response.json().then(json => {
                    console.log(json)
                    setData(json['results'])
                    setPagination({ ...pagination, total: json['count'] })

                })
            }
        })
    }

    React.useEffect(() => {
        getData(pagination)
    }, [pagination.page])

    const onChangePage = (page) => {
        console.log(page)
    }

    return (
        <>
            <Table
                columns={col}
                dataSource={data}
                rowKey={(item) => item.id.toString()}
                pagination={{
                    pageSize: pagination['results'],
                    total: pagination['total'],
                    onChange: (page,pageSize) => {
                         console.log(page,pageSize)
                         setPagination({...pagination,page:page})
                         console.log("Page is ",pagination.page)
                        
                        },
                }} />

        </>

    )

}

export default PartnerTable;