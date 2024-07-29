import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewMedicine = () => {
    const token = localStorage.getItem("token")
    const [data, setData] = useState([])
    const location = useLocation();
    const id = location.pathname.split("/")[3];

    useEffect(() => {
        const getStaff = async () => {
            try {
                const response = await axios.get(`https://pharmacy-v2qn.onrender.com/api/medicine/retrieve/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
                const { medicine } = await response.data
                setData(medicine)
            } catch (error) {
                console.log(error)
            }
        }
        getStaff()
    }, [id, token])

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
     }

    return (
        <div className='view-satff-container'>
            <div className="medical-history-container">
                <table className='medical-history-table'>
                    <thead className='table-head'>
                        <tr className='medical-history-td-tr view-patient-tr'>
                            <th className='view-patient-th'>Medicine Description</th>
                            <th className='view-patient-th'>Category</th>
                            <th className='view-patient-th'>Price</th>
                            <th className='view-patient-th'>Manufacturer</th>
                            <th className='view-patient-th'>Status</th>
                            <th className='view-patient-th'>Product Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='medical-history-td-tr view-patient-tr' key={data.medicine_id}>
                            <td className='medical-history-td-tr'>{getText(data?.description)}</td>
                            <td className='medical-history-td-tr'>{data?.category}</td>
                            <td className='medical-history-td-tr'>{data?.price}</td>
                            <td className='medical-history-td-tr'>{data?.manufacturer}</td>
                            <td className='medical-history-td-tr'>{data?.quantity}</td>
                            <td className='medical-history-td-tr'>
                                <img 
                                    src={data?.thumbnail}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                    }}
                                    alt="Product"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewMedicine