# Surfing Seattle Backend

Backend service for the Surfing Seattle project, built with Node.js, Express, and TypeScript.

## Tech Stack

Implemented:
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (connection ready)
- **Caching**: Redis (connection ready)
- **Container**: Docker

TODO:
- **Authentication**: Implement Solana Wallet (Phantom)
- Set up AI for chatbot functionality
- Add Telegram bot integration
- Implement analytics pipeline
- Set up monitoring and logging
- Configure database 
- Set up proper Redis caching strategies


## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd surfing-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Development mode:
```bash
# Start MongoDB and Redis
docker-compose -f docker/docker-compose.yml up mongodb redis -d

# Run the development server
npm run dev
```

5. Docker mode (all services):
```bash
docker-compose -f docker/docker-compose.yml up --build
```

## API Endpoints

Currently Implemented:
- `GET /` - Health check endpoint

TODO:
- `POST /api/v1/auth/wallet` - Wallet authentication
- `POST /api/v1/chat/message` - Chatbot interaction
- `GET /api/v1/analytics/metrics` - User engagement metrics
- `POST /api/v1/telegram/verify` - Telegram verification

## Development

### Available Scripts

Currently Working:
- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build production TypeScript
- `npm start` - Run production server
- `docker:up` - Start all Docker services
- `docker:down` - Stop all Docker services


### Project Structure

Currently Implemented:
```
src/
├── api/           # Basic route setup
├── config/        # Environment configuration
├── models/        # (Empty) Database models directory
├── services/      # (Empty) Business logic directory
├── types/         # Basic TypeScript types
└── utils/         # Basic utility functions
```

TODO:
- Implement database models
- Add service layer implementations
- Add test directory
- Add OpenAI service integration
- Add Telegram bot service
- Add analytics service

## Docker

Currently Implemented:
- `docker/docker-compose.yml` - Basic service definitions
- `docker/Dockerfile` - Basic Node.js application container

TODO:
- Add production Docker configuration
- Set up Docker volumes for persistent data
- Implement Docker health checks
- Add Docker networking configuration
- Add container resource limits
- Set up proper logging drivers

## Contributing

1. Create a feature branch
2. Commit changes
3. Push to the branch
4. Create a Pull Request

TODO:
- Add code style guide
- Set up GitHub Actions for CI/CD
- Add PR template
- Add issue templates

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
