/**
 * Web3Forms Email Integration Utility for EuroKids Balwant Nagar
 * Automatically emails admission enquiries, walkthrough bookings, and contact messages directly to the owner's inbox.
 */

export interface Web3FormsPayload {
  subject: string;
  [key: string]: any;
}

export const sendWeb3FormsNotification = async (payload: Web3FormsPayload): Promise<boolean> => {
  // Check Vercel / Vite Environment Variable first, then localStorage, then default key
  const envKey = import.meta.env.VITE_WEB3FORMS_KEY;
  const defaultKey = '2fb5af16-e959-4beb-a6c4-a72ddd0c8314';
  const savedKey = envKey || localStorage.getItem('eurokids_web3forms_key') || defaultKey;

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: savedKey,
        from_name: 'EuroKids Balwant Nagar Website',
        ...payload
      })
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Web3Forms Submission Error:', error);
    return false;
  }
};
