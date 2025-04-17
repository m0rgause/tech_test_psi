# I left my environment for test purposes
# Soal 1
[Download Postman file](./soal1/Tech_Test_PSI.postman_collection.json)

# Soal 2
## How To Use
1. Install the required packages
    ```bash
    npm install
    ```
2. Migrate the database
    ```bash
    npx prisma migrate dev --name init
    ```
3. Generate the Prisma client
    ```bash
    npx prisma generate
    ```

4. Run the script
    ```bash
    npm start
    ```
    or
    ```bash
    npm run dev
    ```

## Endpoints
- `GET /auth/google` - Redirects to Google for authentication.
- `GET /auth/google/callback` - Handles the callback from Google after authentication.
- `GET /profile` - Returns the user information.
- `GET /logout` - Logs out the user and redirects to the home page.


# Soal 3

## How To Use
1. Install the required packages
    ```bash
    npm install
    ```
2. Migrate the database
    ```bash
    npx prisma migrate dev --name init
    ```
3. Generate the Prisma client
    ```bash
    npx prisma generate
    ```
4. Run the script
    ```bash
    npm start
    ```
    or
    ```bash
    npm run dev
    ```
