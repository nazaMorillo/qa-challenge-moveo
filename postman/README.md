# Restful Booker API Tests

This collection tests the booking creation endpoint for both success and error cases.

## Running Tests with Newman

### Prerequisites
- Install Node.js
### windows
- Download the recommended Windows Installer (.msi) from the official Node.js website.
- Run the installer and follow the on-screen prompts to complete the installation. This typically includes installing npm as well.
- Verify the installation by opening a Command Prompt and running:

```bash
node -v
npm -v
```
### Linux
-Install Node.js and npm using your distribution's package manager. For example, on Debian/Ubuntu:
```bash
sudo apt update
sudo apt install nodejs npm
```

### Verify the installation by opening a terminal and running:
```bash
node -v
npm -v
```
---
- Install Newman globally:

```bash
npm install -g newman
```
### Verify newman
-After installation, verify Newman is correctly installed by running:
```bash
newman -v
```
-This should display the installed Newman version.

### Running Postman Collections with Newman:
- To run a Postman collection using Newman, export your collection as a JSON file from the Postman application. Then, navigate to the directory containing the exported JSON file in your terminal or command prompt and execute:
```bash
newman run BookingTestsAPI.postman_collection.json
```

### Could display error because is needed associate the environment:
- To associated an environment file. Export your environment as a JSON file from the Postman application, Move to the same folder of the collection.
- Open the terminal in same directory and run: 
```bash
newman run BookingTestsAPI.postman_collection.json -e BookingEnvAPI.postman_environment.json
```

---
### You can use Automate runs via CLI
- Install Postman Cli
```bash
curl -o- "https://dl-cli.pstmn.io/install/unix.sh" | sh
```
- Login with the API Key

```bash
postman login --with-api-key ### "ADD API Key"

postman collection run 8300976-756409e9-4d57-4cf4-8133-94524b6d3821
```
### The Collection could be share by link:
 [https://postman.co/workspace/...](https://.postman.co/workspace/My-Workspace~eb2ad913-e062-4310-85ce-40ae9b0d772d/collection/8300976-af80148d-1718-4988-b73a-b3acdeea5892?action=share&creator=8300976)