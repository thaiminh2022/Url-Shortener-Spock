# URL Shortener using Svelte + Pocketbase
THE SPOCK stack

## URL Shortener

A fully function webapp, users can:
- Create account
- Shorten + store shorten url
- Track url click counts
- Delete url

## Run on local machine

The provided local pocketbase instance is for **windows only**, please go to (Pocketbase Website)[https://pocketbase.io/] and replace the pocketbase instance with a suitable version for your machine

```
$ npm install # Download dependencies
$ npm run build # Build the app # output will be stored in pb_public for pocketbase to serve)
$ ./pocketbase.exe serve # (serve the local pocketbase)

```
