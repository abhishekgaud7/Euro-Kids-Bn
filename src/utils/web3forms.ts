/**
 * Web3Forms Email Integration Utility for EuroKids Balwant Nagar
 * Automatically emails admission enquiries, walkthrough bookings, and contact messages directly to the owner's inbox.
 */

export interface Web3FormsPayload {
  subject: string;
  [key: string]: any;
}

export const sendWeb3FormsNotification = async (payload: Web3FormsPayload): Promise<boolean> => {
  const savedKey = localStorage.getItem('eurokids_web3forms_key');

  // If owner hasn't set their key yet, we default gracefully
  if (!savedKey) {
    return false;
  }

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
