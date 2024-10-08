'use client';

import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import clsx from 'clsx';
import { PaymentMethodProps, TransactionData } from '@/types/declaration';
import { toast } from 'sonner';
import { useSubmitTicket } from '@/hooks/mutations/useSubmitTicket';
import { useSubmitTransaction } from '@/hooks/mutations/useSubmitTransaction';
import { useSaveTransaction } from '@/hooks/mutations/useSaveTransaction';

const paymentMethods = [
  { id: 1, method: 'Credit Card', icon: <CreditCard /> },
  { id: 2, method: 'Mobile Money', icon: <CreditCard /> },
  { id: 3, method: 'Pay Later', icon: <CreditCard /> },
];

const PaymentMethod: React.FC<PaymentMethodProps> = ({ onPaymentSelect, formData, paymentMethod, transactionType }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');


  const { handleSubmitTransaction, isPending } = useSubmitTransaction(transactionType);
  const { handleSaveTransaction, isPending: isSavingTransaction } = useSaveTransaction();


  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    onPaymentSelect(method);
  };


  const handlePayment = () => {
    if (!selectedMethod) {
      return toast.error("Please select a payment method");
    }

    if (selectedMethod === 'Pay Later') {
      handleSubmitTransaction(formData);
      return;
    }

    handleSaveTransaction(formData as any)


    // toast.warning("Feature not available at the moment");
  };

  return (
    <div className="payment-method">
      <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>
      <div className="flex sm:space-x-4">
        {paymentMethods.map(({ id, method, icon }) => (
          <label key={id} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={selectedMethod === method}
              onChange={() => handleMethodSelect(method)}
              className="mr-2"
            />
            <div
              className={clsx(
                'p-4 flex items-center space-x-2 border rounded-md',
                {
                  'border-blue-500 bg-blue-50': selectedMethod === method,
                  'border-gray-300': selectedMethod !== method,
                }
              )}
            >
              {icon}
              <span className="text-md">{method}</span>
            </div>
          </label>
        ))}
      </div>

      {selectedMethod === "Pay Later" && (
        <div className="mt-4 bg-yellow-100 p-4 border border-yellow-300 rounded-md">
          <p className="text-sm">
            Kindly note that the current booking fee is guaranteed for 48 hours
          </p>
        </div>
      )}

      {(selectedMethod === 'Credit Card' || selectedMethod === 'Mobile Money') && (
        <div className="mt-4">
          <p className="text-sm">
            Clicking the <span className="font-bold">Pay</span> button will redirect you to our payment platform.
          </p>
        </div>
      )}

      <div className="mt-4">
        <Button
          loading={isPending || isSavingTransaction}
          loadingText="Processing..."
          type="button"
          onClick={handlePayment}
          className="w-full py-2 px-4 text-white rounded-md flex items-center justify-center disabled:cursor-not-allowed"
        >
          Proceed with payment
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethod;
