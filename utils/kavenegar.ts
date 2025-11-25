export const sendOtp = async (phoneNumber: string, code: string) => {
    try {
        // Temporary Webhook for testing
        const webhookUrl = 'https://n8n.ekeepa-dev.ir/webhook/escape_persona';

        // Use URLSearchParams for x-www-form-urlencoded to support no-cors
        const params = new URLSearchParams();
        params.append('phoneNumber', phoneNumber);
        params.append('code', code);
        params.append('source', 'escape_persona_app');
        params.append('timestamp', new Date().toISOString());

        // mode: 'no-cors' allows sending without CORS errors, but response is opaque (cant read it)
        await fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        });

        console.log('OTP sent to webhook (blind mode)');
        // We assume success because we can't read the response in no-cors mode
        return { status: 200, message: 'Sent' };
    } catch (error) {
        console.error('Error sending OTP to webhook:', error);
        throw error;
    }
};
