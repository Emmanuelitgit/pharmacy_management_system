import React from "react";
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";
import logo from "../../Componets/images/logo 2.png"
import {Font} from '@react-pdf/renderer';
import MyCustomFont from '../../fonts/Anton-Regular.ttf';

Font.register({
  family: 'AntonFamily',
  src: MyCustomFont
})

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    backgroundColor:'white'
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
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
    width:'20%',
    height:'20%'
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: "AntonFamily",
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
});

const PDFDocument = () => {

  const pageColors = ['#f6d186', '#f67280', '#c06c84'];

  const pages = [
    {text: 'First page content goes here...', image: logo },
  ]

  return (
    <Document>
      {pages.map((page, index) => {
        return (
          <Page key={index} style={styles.body}>
          <Text style={styles.header} fixed></Text>
          <Image style={styles.image} src={page.image} />
          <Text style={styles.text}>
          {page.text}
          </Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </Page>
        )
      })}

    </Document>
  );
};

export default PDFDocument;