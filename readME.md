# Google Sheets Node.js API

This project integrates with Google Sheets to add, retrieve, update, and delete data using a Node.js backend.

## Setup Instructions

### Prerequisites
- Node.js installed on your machine
- A Google Cloud account with access to Google Sheets API
- A Google Service Account key file

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=3005
   SPREADSHEET_ID=your_google_sheet_id
   GOOGLE_APPLICATION_CREDENTIALS_JSON=paste_credential_directly_here

   ```
   - Note: before pasting json file content remove the new lines by using this website 
   - [Click Here](https://codebeautify.org/remove-line-breaks)

4. Place your Google Service Account key JSON file inside the project root folder.

5. Start the server:
   ```sh
   npm start
   ```

### API Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/sheets` | Retrieve all data from Google Sheets |
| GET | `/sheets/:id` | Retrieve specific data from Google Sheets |
| GET | `/sheets/email/:email` | Check if email already used |
| GET | `/sheets/phone/:phone` | Check if phone already used |
| POST | `/sheets` | Add new data to Google Sheets |
| PUT | `/sheets/:id` | Update data in Google Sheets by ID |
| DELETE | `/sheets/:id` | Delete data from Google Sheets by ID |

### Deploying to Vercel

1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```

2. Run the Vercel setup:
   ```sh
   vercel
   ```

3. Deploy:
   ```sh
   vercel --prod
   ```

### Notes
- Ensure that the first row of your Google Sheet contains the headers: `ID`, `Name`, `Email`, `Gender`, `Phone`, `Branch`, `Year`.
- The `ID` column is auto-generated and unique for each entry.

### License
This project is licensed under the MIT License.
