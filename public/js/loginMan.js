     // Function to send data as JSON to the server
     async function sendDataToServer(data) {
        try {

            console.log(data.logemail);
            console.log(data.logpass);


            const response = await fetch('your-server-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Data sent successfully
                alert('Login successful!');
            } else {
                // Handle server error or validation errors
                alert('Error sending data to the server.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending data.');
        }
    }

    // Handle form submission
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('form.requires-validation');
        const submitButton = document.getElementById('submit');

        submitButton.addEventListener('click', async () => {
            // Retrieve form data
            const formData = {
                logemail: document.getElementById('logemail').value,
                logpass: document.getElementById('logpass').value,
            };

            // Send the form data as JSON to the server
            await sendDataToServer(formData);
        });
    });