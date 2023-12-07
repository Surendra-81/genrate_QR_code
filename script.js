// public/script.js
function generateQRCode() {
    const dataInput = document.getElementById('data-input');
    const qrcodeContainer = document.getElementById('qrcode-container');
    const errorMessageContainer = document.getElementById('error-message');
    const qrTitleInput = document.getElementById('qr-title');

    const data = dataInput.value;
    const qrTitle = qrTitleInput.value || 'Scan Me'; // Default title if not provided

    // Clear previous QR code and error messages
    qrcodeContainer.innerHTML = '';
    errorMessageContainer.innerHTML = '';

    if (!data) {
        errorMessageContainer.innerText = 'Please enter data to generate QR code.';
        return;
    }

    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    })
    .then(response => response.json())
    .then(data => {
        // Append the generated QR code to the container
        const img = document.createElement('img');
        img.src = data.qrCode;
        img.alt = 'QR Code';
        img.style.width = '200px'; 
        qrcodeContainer.appendChild(img);

        // Add a title below the QR code
        const title = document.createElement('p');
        title.innerText = qrTitle;
        title.style.textAlign = 'center';
        qrcodeContainer.appendChild(title);
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessageContainer.innerText = 'Error generating QR code.';
    });
}
