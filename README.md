# QR Code Generator with Database Integration

This project is a simple QR Code generator that allows users to generate QR codes from provided data and saves the generated QR code data to a MySQL database.

## Features

- Generate QR codes from user-provided data.
- Save generated QR code data to a MySQL database.
- Retrieve and display QR code data from the database.

## Technologies Used

- Node.js
- Express.js
- MySQL
- QRCode.js (for generating QR codes)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/qr-code-generator.git
    ```

2. Install dependencies:

    ```bash
    cd qr-code-generator
    npm install
    ```

3. Set up MySQL database:
   
    - Create a MySQL database named `qrcode`.
    - Configure the MySQL connection details in `app.js`:

        ```javascript
        const dbConfig = {
            host: 'localhost',
            user: 'your-mysql-username',
            password: 'your-mysql-password',
            database: 'qrcode',
        };
        ```

4. Run the application:

    ```bash
    npm start
    ```

5. Access the application at [http://localhost:3000](http://localhost:3000).

## Usage

1. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000).
2. Enter the data for which you want to generate a QR code and click the "Generate" button.
3. The generated QR code will be displayed on the page.
4. The data will be saved to the MySQL database.

## Database Schema

The project uses a MySQL database with a table named `user_data`:

```sql
CREATE TABLE user_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data VARCHAR(255) NOT NULL
);
