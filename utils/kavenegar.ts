import axios from 'axios';

const API_KEY = '616862494F484C616E6A54616E7A726F554B764B6874456563795467624E6F7165425474463065627557553D';

export const sendOtp = async (phoneNumber: string, code: string) => {
    try {
        // Note: Calling this directly from the browser might be blocked by CORS policies of the Kavenegar API.
        // In a production environment, this should be done via a backend proxy.
        const url = `https://api.kavenegar.com/v1/${API_KEY}/verify/lookup.json`;

        const response = await axios.get(url, {
            params: {
                receptor: phoneNumber,
                token: code,
                template: 'login-otp'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error;
    }
};
