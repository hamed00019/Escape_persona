export const saveUserData = async (phone: string, personaResult: any, stats: any) => {
    try {
        const response = await fetch('http://localhost:3001/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone_number: phone,
                persona_type: personaResult?.type,
                persona_title: personaResult?.persianTitle,
                stats: stats
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error saving user data locally:', error);
        // We don't throw here to prevent blocking the user flow if DB fails
        return null;
    }
};
