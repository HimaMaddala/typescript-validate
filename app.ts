
const apiUrl = 'https://6714e966690bf212c762ed61.mockapi.io/api/v1/form';

const form = document.getElementById('contactForm') as HTMLFormElement;
const messageDiv = document.getElementById('message') as HTMLDivElement;

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = (document.getElementById('nameInput') as HTMLInputElement).value.trim();
    const email = (document.getElementById('emailInput') as HTMLInputElement).value.trim();
    const contact = (document.getElementById('contactInput') as HTMLInputElement).value.trim();
    const subject = (document.getElementById('subjectInput') as HTMLInputElement).value.trim();
    const message = (document.getElementById('messageInput') as HTMLTextAreaElement).value.trim();

    if (!name || !email || !contact || !subject || !message) {
        displayMessage('All fields are required.', 'error');
        return;
    }

    if (!validateEmail(email)) {
        displayMessage('Invalid email address.', 'error');
        return;
    }

    if (contact.length !== 10 || isNaN(Number(contact))) {
        displayMessage('Contact number must be exactly 10 digits.', 'error');
        return;
    }

    const data = {
        name,
        email,
        contact,
        subject,
        message,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            displayMessage('Form submitted successfully', 'success');
            form.reset(); 
        } else {
            displayMessage('Submission failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        displayMessage('Submission failed. Please try again.', 'error');
    }
});

function validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function displayMessage(msg: string, type: 'success' | 'error') {
    messageDiv.textContent = msg;
    messageDiv.style.color = type === 'success' ? 'green' : 'red';
}
