# Case Summarization UI

## Prerequisites

-   Node version `23.1.0`
-   NPM version `10.9.0`

## Setup Instructions

1. **Install Dependencies:**

    ```bash
    npm ci

    # If package-lock.json is not available, use the following command instead:
    # npm install
    ```

2. **Environment Variables**

    Before running the application, configure the necessary environment variables.

    i. Copy the example environment file:

    ```sh
    cp .env.example .env
    ```

    ii. Open `.env` and replace placeholder values with your actual configuration.

3. **Start Application**

    To start the application in development mode, run:

    ```bash
    npm run dev
    ```

## Build (Production)

  ```bash
  npm run build
  ```

## Documentation

- For detailed usage, architecture, and API documentation, see the [`Documentation.md`](./Documentation.md) file in the project root.
