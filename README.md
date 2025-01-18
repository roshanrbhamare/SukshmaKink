# SukshmaLink

SukshmaLink is a URL shortener application built using **Express.js**, **PostgreSQL**, and **NanoID**. It provides a simple interface to shorten long URLs and redirect users to the original link using the shortened URL.

## Features
- Shorten long URLs into user-friendly, shareable links.
- Retrieve and redirect to the original URL using the short URL.
- View all generated URLs along with their domains, original URLs, and shortened versions.

## Technologies Used
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **Unique Identifier**: NanoID
- **Environment Variables**: dotenv
- **View Engine**: EJS (Embedded JavaScript templates)

## Prerequisites
Ensure you have the following installed:
- Node.js (v14 or later)
- PostgreSQL

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/roshanrbhamare/SukshmaKink.git
   
   cd SukshmaLink
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the PostgreSQL database:
   - Create a database in PostgreSQL (e.g., `sukshmalink`).
   - Run the following SQL command to create the required table:
     ```sql
     CREATE TABLE urldata (
         id SERIAL PRIMARY KEY,
         domain TEXT,
         bigurl TEXT,
         shorturl TEXT UNIQUE
     );
     ```

4. Configure environment variables:
   - Create a `.env` file in the project root and add the following details:
     ```env
     PG_USER=your_postgres_username
     PG_PASSWORD=your_postgres_password
     PG_HOST=localhost
     PG_DATABASE=sukshmalink
     PG_PORT=5432
     ```

5. Start the application:
   ```bash
   npm start
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure
```
SukshmaLink/
├── public/            # Static files (CSS, JavaScript, etc.)
├── views/             # EJS templates
├── .env               # Environment variables
├── index.js           # Main server file
├── package.json       # Node.js dependencies and scripts
└── README.md          # Project documentation
```

## API Endpoints
### GET `/`
- Renders the home page with a list of all stored URLs.

### GET `/shorten`
- Renders the form to create a new short URL.

### POST `/shorten`
- Accepts a long URL and generates a shortened version.

### GET `/link/:sid`
- Redirects to the original URL corresponding to the provided short URL identifier.

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a meaningful commit message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.


## Acknowledgements
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [NanoID](https://github.com/ai/nanoid)
- [dotenv](https://github.com/motdotla/dotenv)
