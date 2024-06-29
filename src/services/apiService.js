const baseUrl = 'http://localhost:3000'; // Adjust this URL based on your environment

export const fetchEvents = async () => {
    try {
        const response = await fetch(`${baseUrl}/events`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
};
