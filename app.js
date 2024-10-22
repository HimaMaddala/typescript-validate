"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiUrl = 'https://6714e966690bf212c762ed61.mockapi.io/api/v1/form';
const form = document.getElementById('contactForm');
const messageDiv = document.getElementById('message');
form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const contact = document.getElementById('contactInput').value.trim();
    const subject = document.getElementById('subjectInput').value.trim();
    const message = document.getElementById('messageInput').value.trim();
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
        const response = yield fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            displayMessage('Form submitted successfully', 'success');
            form.reset();
        }
        else {
            displayMessage('Submission failed. Please try again.', 'error');
        }
    }
    catch (error) {
        console.error('Error:', error);
        displayMessage('Submission failed. Please try again.', 'error');
    }
}));
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function displayMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.style.color = type === 'success' ? 'green' : 'red';
}
