# i left my environmet for test purposes

# How To Use
# 1. Install the required packages
#    ```bash
#    npm install
#    ```
# 2. Migrate the database
#    ```bash
#    npx prisma migrate dev --name init
#    ```
# 3. Generate the Prisma client
#    ```bash
#    npx prisma generate
#    ```

# 2. Run the script
#    ```bash
#    npm start
#    ```
#    or
#    ```bash
#    npm run dev
#    ```

# Endpoints
# - `GET /auth/google` - Redirects to Google for authentication.
# - `GET /auth/google/callback` - Handles the callback from Google after authentication.
# - `GET /profile` - Retun the user information.
# - `GET /logout` - Logs out the user and redirects to the home page.