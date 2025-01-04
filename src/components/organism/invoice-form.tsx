import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface InvoiceFormProps {
  onSubmit: (data: InvoiceData) => void;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerAddress: string;
  items: Array<{ description: string; quantity: number; price: number }>;
  total: number;
}

export function InvoiceForm({ onSubmit }: InvoiceFormProps) {
  const [invoiceData, setInvoiceData] = React.useState<InvoiceData>({
    invoiceNumber: '',
    date: '',
    customerName: '',
    customerAddress: '',
    items: [{ description: '', quantity: 0, price: 0 }],
    total: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData((prev) => ({
      ...prev,
      items: newItems,
      total: newItems.reduce((sum, item) => sum + item.quantity * item.price, 0),
    }));
  };

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 0, price: 0 }],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(invoiceData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Número de Factura"
        name="invoiceNumber"
        value={invoiceData.invoiceNumber}
        onChange={handleChange}
      />
      <Input
        label="Fecha"
        name="date"
        type="date"
        value={invoiceData.date}
        onChange={handleChange}
      />
      <Input
        label="Nombre del Cliente"
        name="customerName"
        value={invoiceData.customerName}
        onChange={handleChange}
      />
      <Input
        label="Dirección del Cliente"
        name="customerAddress"
        value={invoiceData.customerAddress}
        onChange={handleChange}
      />
      {invoiceData.items.map((item, index) => (
        <div key={index} className="flex space-x-2">
          <Input
            label="Descripción"
            value={item.description}
            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
          />
          <Input
            label="Cantidad"
            type="number"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
          />
          <Input
            label="Precio"
            type="number"
            value={item.price}
            onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
          />
        </div>
      ))}
      <Button type="button" onClick={addItem}>Agregar Item</Button>
      <div>Total: ${invoiceData.total.toFixed(2)}</div>
      <Button type="submit">Generar Factura</Button>
    </form>
  );
}

