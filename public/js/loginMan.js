     // Function to send data as JSON to the server
     async function sendDataToServer(data) {
        try {
            // http://localhost:4201
            const response = await fetch('https://reman.onrender.com/doLoginMan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // http://localhost:4201
                window.location.replace("https://reman.onrender.com/manufacturer/showInventory");
            } else {
                // Handle server error or validation errors
                alert('Invalid Login!Please Try Again');
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
                email: document.getElementById('logemail').value,
                pass: document.getElementById('logpass').value,
            };

            // Send the form data as JSON to the server
            await sendDataToServer(formData);
        });
    });