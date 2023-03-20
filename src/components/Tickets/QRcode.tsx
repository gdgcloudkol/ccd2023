import { useEffect } from 'react';

declare global {
  interface Window {
    generateQR: (bookingId: string) => any;
  }
}

const QRcode = ({ bookingId }: { bookingId: string }) => {
  useEffect(() => {
    if (bookingId) {
      window.generateQR(bookingId);
    }
  }, []);
  return (<></>);
}

export default QRcode;