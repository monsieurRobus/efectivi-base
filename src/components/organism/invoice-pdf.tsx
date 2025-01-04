import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { InvoiceData } from './organism/invoice-form';

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 20 },
  section: { marginBottom: 10 },
  table: { display: 'table', width: 'auto', borderStyle: 'solid', borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableCol: { width: '25%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableCell: { margin: 'auto', marginTop: 5, fontSize: 10 },
});

interface InvoicePDFProps {
  data: InvoiceData;
}

export function InvoicePDF({ data }: InvoicePDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Factura</Text>
        <View style={styles.section}>
          <Text>Número de Factura: {data.invoiceNumber}</Text>
          <Text>Fecha: {data.date}</Text>
        </View>
        <View style={styles.section}>
          <Text>Cliente: {data.customerName}</Text>
          <Text>Dirección: {data.customerAddress}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Descripción</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Cantidad</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Precio</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Total</Text></View>
          </View>
          {data.items.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{item.description}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{item.quantity}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>${item.price.toFixed(2)}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>${(item.quantity * item.price).toFixed(2)}</Text></View>
            </View>
          ))}
        </View>
        <Text style={{ marginTop: 20 }}>Total: ${data.total.toFixed(2)}</Text>
      </Page>
    </Document>
  );
}

