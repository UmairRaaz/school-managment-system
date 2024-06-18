import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderBottomColor: '#000',
    backgroundColor: '#f0f8ff',
    textAlign: 'center',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: 'center',
    padding: 8,
  },
});

const AttendancePDF = ({ attendanceData, monthTotal, renderDays, renderAttendanceRows }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Attendance Report</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>SR.NO</Text>
            <Text style={styles.tableColHeader}>Name</Text>
            <Text style={styles.tableColHeader}>RN</Text>
            {renderDays()}
            <Text style={styles.tableColHeader}></Text>
            <Text style={[styles.tableColHeader, styles.bgGreen]}>Total</Text>
          </View>
          {renderAttendanceRows()}
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}></Text>
            <Text style={[styles.tableColHeader, styles.bgGreen]}>Total</Text>
            <Text style={styles.tableColHeader}></Text>
            {monthTotal.map((total, index) => (
              <Text key={`total-${index}`} style={styles.tableCol}>{total > 0 ? total : '-'}</Text>
            ))}
            <Text style={[styles.tableColHeader, styles.bgGreen]}>{monthTotal.reduce((acc, curr) => acc + curr, 0)}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default AttendancePDF;
