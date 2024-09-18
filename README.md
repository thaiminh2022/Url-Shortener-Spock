# URL Shortener using Svelte + Pocketbase
THE SPOCK stack

## URL Shortener

A fully function web app, users can:
- Create account
- Shorten + store shorten URL
- Track url click counts
- Delete URL

## Run on local machine

The provided local pocketbase instance is for **Windows only**, please go to [Pocketbase Docs](https://pocketbase.io/docs) and replace the "pocketbase.exe" instance with a suitable version for your machine

1. Install dependencies
2. Build the app (built folder changed to pb_public to serve using pocketbase)
3. Serve pocketbase
```
npm install 
npm run build
./pocketbase.exe serve
```
