# URL Shortener using Svelte + Pocketbase
THE SPOCK stack

## URL Shortener

A fully function web app, users can:
- Create account
- Shorten + store shorten URL
- Track url click counts
- Delete URL

## Start the project
### Requirements
- NodeJS

### Running locally
The provided local Pocketbase instance is for **Windows only**, please go to [Pocketbase Docs](https://pocketbase.io/docs) and replace the "pocketbase.exe" instance with a suitable version for your machine (not tested)

1. Clone the project
```
git clone https://github.com/thaiminh2022/Url-Shortener-Spock.git ./url-shortener-spock
```
2. Install dependencies
3. Build the app (built folder changed to pb_public to serve using pocketbase)
4. Serve pocketbase
```
npm install 
npm run build
./pocketbase.exe serve
```

## To view database
Please open the admin URL and login to the already created admin account, this will be used to view all the information in the Pocketbase database
- Username: admin@admin.com
- Password: 1234567890

## To use webapp
1. Create an account with a valid username + password (password must be between 8-72 characters)
2. Add a valid link, the shortened link will appear on dashboard
