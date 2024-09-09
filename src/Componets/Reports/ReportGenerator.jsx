import React from "react";
import PDFDocument from "./PDFDocument";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import './style.css'


const ReportGenerator = ({id}) => {
  
  const handleViewPDF = async () => {
    const blob = await pdf(<PDFDocument />).toBlob(); // Convert PDF to a Blob
    const url = URL.createObjectURL(blob); 
    window.open(url, '_blank'); 
  };

  console.log(id)

  return (
    <div className="reportGeneratorContainer">
      <button onClick={handleViewPDF}>
        View
      </button>

      <PDFDownloadLink document={<PDFDocument />} fileName="report.pdf">
        {({ loading }) =>
          loading ? <button>Loading Document...</button> : <button>Download</button>
        }
      </PDFDownloadLink>
    </div>
  );
};

export default ReportGenerator;