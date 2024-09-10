import React from "react";
import { Page, Text, Image, Document, StyleSheet, View } from "@react-pdf/renderer";
import logo from "../../Componets/images/logo 2.png";
import { Font } from "@react-pdf/renderer";
import MyCustomFont from "../../fonts/Anton-Regular.ttf";

Font.register({
  family: "AntonFamily",
  src: MyCustomFont,
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "AntonFamily",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "AntonFamily",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    marginHorizontal: 1,
    width: "16%",
    height: "11%",
    marginLeft: "40%",
  },
  header: {
    fontSize: 10,
    marginTop: '5%',
    textAlign: "center",
    textDecoration: 'underline',
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
    fontFamily: "AntonFamily",
  },
  // Table styles
  table: {
    display: "table",
    width: "auto",
    marginTop: "5%",
    borderBottomWidth: 1,
    borderColor: "#bfbfbf",
    borderStyle: "solid",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderBottomWidth: 1,
    borderColor: "#bfbfbf",
    borderStyle: "solid",
    borderRightWidth: 0, // No vertical borders
    borderLeftWidth: 0, // No vertical borders
  },
  tableHeader: {
    fontSize: 13,
    fontWeight: "bold",
    padding: 5,
  },
  tableCell: {
    fontSize: 10,
    padding: 5,
    fontWeight: "normal",
    paddingTop:"15%"
  },
});

const PDFDocument = () => {
  const medicines = [
    { itemNo: 1, name: "Paracetamol", unitPrice: 5.0, quantity: 10, totalAmount: 50.0 },
    { itemNo: 2, name: "Amoxicillin", unitPrice: 7.5, quantity: 5, totalAmount: 37.5 },
    { itemNo: 3, name: "Ibuprofen", unitPrice: 8.0, quantity: 8, totalAmount: 64.0 },
  ];

  return (
    <Document>
      <Page style={styles.body}>
        <Image style={styles.image} src={logo} />
        <Text style={styles.header}>
          Below is the breakdown of the monthly sales report for January 5th, 2024
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Item No.</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Medicine</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Unit Price</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Quantity Sold</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Total Amount</Text>
            </View>
          </View>

          {/* Table Rows */}
          {medicines.map((medicine, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{medicine.itemNo}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{medicine.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{medicine.unitPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{medicine.quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{medicine.totalAmount.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        />
      </Page>
    </Document>
  );
};

export default PDFDocument;