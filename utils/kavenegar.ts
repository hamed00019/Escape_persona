export const sendOtp = async (phoneNumber: string, code: string) => {
    try {
        console.log(`[OFFLINE MODE] Simulated sending OTP ${code} to ${phoneNumber}`);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return { status: 200, message: 'Sent Locally' };
    } catch (error) {
        console.error('Error simulating OTP:', error);
        throw error;
    }
};
