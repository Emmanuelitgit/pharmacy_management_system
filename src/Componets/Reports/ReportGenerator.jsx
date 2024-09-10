import React, { useState } from "react";
import PDFDocument from "./PDFDocument";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import './style.css'
import { useDispatch } from "react-redux";
import { handleReports } from "../../store/data";
import { useSelector } from "react-redux";


const ReportGenerator = ({orders}) => {

  const [medicines, setMedicines] = useState([]);
  const dispatch = useDispatch()
  const [added, setAdded] = useState(false)
  
  const handleViewPDF = async () => {
    try {
      await setMedicines(orders) 
      const blob = await pdf(<PDFDocument data={orders}/>).toBlob(); // Convert PDF to a Blob
      const url = URL.createObjectURL(blob); 
      window.open(url, '_blank');
    } catch (error) {
      console.log(error)
    }
  };


  const data = useSelector((state)=>state?.data?.salesReport)

  return (
    <div className="reportGeneratorContainer">
      <button onClick={handleViewPDF}>
        View
      </button>

      <PDFDownloadLink document={<PDFDocument data={orders}/>} fileName="report.pdf">
        {({ loading }) =>
          loading ? <button>Loading Document...</button> : <button>Download</button>
        }
      </PDFDownloadLink>
    </div>
  );
};

export default ReportGenerator;