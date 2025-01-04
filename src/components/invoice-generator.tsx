'use client'

import React, { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { InvoiceForm, InvoiceData } from './organism/invoice-form';
import { InvoicePDF } from '../components/invoice-pdf';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function InvoiceGenerator() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  const handleSubmit = (data: InvoiceData) => {
    setInvoiceData(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generador de Facturas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Formulario de Factura</CardTitle>
          </CardHeader>
          <CardContent>
            <InvoiceForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Vista Previa de la Factura</CardTitle>
          </CardHeader>
          <CardContent>
            {invoiceData && (
              <PDFViewer width="100%" height={600}>
                <InvoicePDF data={invoiceData} />
              </PDFViewer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

