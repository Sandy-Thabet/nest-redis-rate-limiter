# API Rate Limiter with NestJS and Redis

## Overview

This project implements an API rate limiter using NestJS and Redis. It prevents excessive API requests by enforcing limits on users or IPs, ensuring fair usage and protecting against abuse.

## Features

- Set request limits per user/IP.
- Store request count in Redis for fast lookups.
- Return meaningful error messages when limits are exceeded.
- Middleware-based implementation for easy integration.

## Technologies Used

- **NestJS** - Backend framework for building scalable APIs.
- **Redis** - In-memory data store for fast rate limit enforcement.
- **rate-limiter-flexible** - Library for managing request limits.
- **Docker (Optional)** - For running Redis in a containerized environment.

## Installation

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/api-rate-limiter.git
cd api-rate-limiter
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Redis

#### Option 1: Install Redis Locally (Without Docker)

- **Mac (Homebrew):**
  ```sh
  brew install redis
  brew services start redis
  ```
- **Linux (Ubuntu/Debian):**
  ```sh
  sudo apt update
  sudo apt install redis-server
  sudo systemctl start redis
  ```
- **Windows:** Use **WSL** or install Redis manually from [here](https://github.com/microsoftarchive/redis/releases).

#### Option 2: Run Redis with Docker (Recommended)

Ensure you have [Docker installed](https://www.docker.com/get-started), then run:

```sh
docker run --name redis -p 6379:6379 -d redis
```

To verify Redis is running, connect to it:

```sh
docker exec -it redis redis-cli
PING  # Should return "PONG"
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add:

```
REDIS_HOST=localhost
REDIS_PORT=6379
RATE_LIMIT_MAX=100  # Maximum requests allowed
RATE_LIMIT_DURATION=15  # Time window in minutes
```

### 5. Start the Application

```sh
npm run start
```

### 6. Testing the Rate Limiter

Use **Postman** or `curl` to test the API:

```sh
curl -X GET http://localhost:3000/protected-endpoint
```

After exceeding the limit, you should get a `429 Too Many Requests` error.

## Contributing

Feel free to fork this repo and submit pull requests.

## License

This project is open-source under the MIT License.
