import React from 'react';
import { Table } from 'antd';
import { partnersUrl } from '../../config/config';
import PartnerDetail from './PartnerDetails';

const PartnerTable = (props) => {
    const [data, setData] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        page: 1,
        results: 20
    })
    const col = [
        {
            title: 'Type',
            key: "companyName"
        },
        {
            title: 'Company Name',
            dataIndex: "companyName",
        },
        {
            title: 'Name of Owner',
            key: "companyName"
        },
        {
            title: 'Contact Number',
            key: "companyName"
        },
        {
            title: 'Email',
            key: "companyName"
        },
        {
            title: 'Address',
            key: "companyName"
        },
        {
            title: 'Year of Establishment',
            key: "companyName"
        },

    ]

    const getData = (params) => {

        fetch(partnersUrl + `?results=${params["results"]}&page=${params["page"]}`).then(response => {
            if (response.status === 200) {
                response.json().then(json => {
                    console.log(json)
                    setData(json['results'])
                })
            }
        })
    }

    React.useEffect(() => {
        getData(pagination)
    }, [])

    return (
        <Table columns={col} dataSource={data} rowKey={(item) => item.id.toString()} />
    )

}

export default PartnerTable;