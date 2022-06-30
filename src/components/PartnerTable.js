import React from 'react';
import {Table} from 'antd';
import 'antd/dist/antd.min.css'

const PartnerTable=(props)=>{
    const [data, setData] = React.useState([]);
    const col =[
        {
            title:'Type'
        },
        {
            title:'Company Name'
        },
        {
            title:'Name of Owner'
        },
        {
            title:'Contact Number'
        },
        {
            title:'Email'
        },
        {
            title:'Address'
        },
        {
           title:'Year of Establishment'
        },
        
    ]
    return(
        <>
        <Table columns={col}>
        </Table>
        </>
    )

}

export default PartnerTable;