import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import "./certificate.css";

import template1 from "./templates/template1.png";
import template2 from "./templates/template2.png";
import template3 from "./templates/template3.png";

const Certificate = () => {
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [signature, setSignature] = useState("");
  const [date, setDate] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("template1");

  const certificateRef = useRef();

  // Single certificate download
  const handleDownload = () => {
    html2canvas(certificateRef.current, { scale: 2, useCORS: true }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "px", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${name || "certificate"}.pdf`);
      }
    );
  };

  // Mass certificate generation from Excel
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet);

      const zip = new JSZip();

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        setName(row.Name || "");
        setSubtitle(row.Subtitle || "");
        setSignature(row.Signature || "");
        setDate(row.Date || "");

        // wait for React state update & re-render
        await new Promise((resolve) => setTimeout(resolve, 300));

        const canvas = await html2canvas(certificateRef.current, {
          scale: 2,
          useCORS: true,
        });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("landscape", "px", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        const pdfBlob = pdf.output("blob");
        zip.file(`${row.Name || "certificate"}.pdf`, pdfBlob);
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "certificates.zip");
    };
    reader.readAsArrayBuffer(file);
  };

  const templates = {
    template1,
    template2,
    template3,
  };

  return (
    <div>
      <div className="top-header">
        <div className="logo">LOGO</div>
        <div className="csi">CSI</div>
      </div>

      <div className="certificate-section">
        <div className="form-container">
          <h2>CREATE YOUR CERTIFICATE NOW</h2>

          <label className="template-label">Select a Template:</label>
          <div className="template-selector">
            {Object.keys(templates).map((tpl) => (
              <img
                key={tpl}
                src={templates[tpl]}
                alt={tpl}
                className={`template-thumb ${
                  selectedTemplate === tpl ? "active" : ""
                }`}
                onClick={() => setSelectedTemplate(tpl)}
              />
            ))}
          </div>

          <label>Name</label>
          <div className="name-upload-container">
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Changed from <label> to <button> */}
            <button
              type="button"
              className="upload-btn"
              onClick={() => document.getElementById("excel-upload").click()}
            >
              Upload 
            </button>
            <input
              id="excel-upload"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleExcelUpload}
              style={{ display: "none" }}
            />
          </div>

          <label>Subtitle</label>
          <input
            type="text"
            placeholder="Enter Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />

          <label>Signature</label>
          <input
            type="text"
            placeholder="Enter Signature"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
          />

          <label>Date</label>
          <input
            type="text"
            placeholder="Enter Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button className="download-btn" onClick={handleDownload}>
            Download Certificate
          </button>
        </div>

        <div className="preview-container">
          <div
            className={`certificate-wrapper ${selectedTemplate}`}
            ref={certificateRef}
          >
            <img
              src={templates[selectedTemplate]}
              alt="certificate"
              className="certificate-bg"
            />
            <div className="cert-overlay">
              <div className="cert-name">{name}</div>
              <div className="cert-subtitle">{subtitle}</div>
              <div className="cert-signature">{signature}</div>
              <div className="cert-date">{date}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
