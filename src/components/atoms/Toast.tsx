import React from 'react';
import { Toast as ToastType } from '../../types/toast';
import { XCircle, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps extends ToastType {
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const icons = {
    info: <Info className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
  };

  const colors = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div className={`flex items-center p-4 mb-4 text-white rounded-md ${colors[type]}`} role="alert">
      <div className="mr-3">{icons[type]}</div>
      <div className="mr-2 font-medium">{message}</div>
      <button onClick={onClose} className="ml-auto" aria-label="Cerrar">
        <XCircle className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Toast;

