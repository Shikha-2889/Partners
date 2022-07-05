import React from 'react';
import { Table } from 'antd';
import { partnersUrl } from '../../config/config';
import PartnerDetail from './PartnerDetails';
import { Pagination} from 'antd';

const PartnerTable = (props) => {
    const [data, setData] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        page: 1,
        results: 5,
        
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
            render:(item) =>{return <p>{item.first_name+" " +item.last_name}</p>}
        },
        {
            title: 'Contact Number',
            dataIndex: "phone"
        },
        {
            title: 'Email',
            dataIndex: "user",
            render:item=>item.email
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
                    setPagination({total:json['count']})
                    
                })
            }
        })
    }

    React.useEffect(() => {
        getData(pagination)
    }, [])

    const onChangePage=(page)=>{
        console.log(page)
    }

    return (
        <>
        <Table columns={col} dataSource={data} rowKey={(item) => item.id.toString()} pagination={pagination} />
        <Pagination current ={pagination["page"]} onChange={onChangePage} total={10} />
        </>
        
    )

}

export default PartnerTable;