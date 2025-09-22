# PixelPress - Image Compression Tool

A modern web application for efficient image compression, built with React and Express.

## Features

- Drag and drop image upload
- Efficient image compression
- Real-time preview
- Secure file handling
- Responsive design
- Mobile-friendly interface

## Tech Stack

### Frontend

- React with TypeScript
- Vite
- TailwindCSS
- React Router
- Axios

### Backend

- Node.js
- Express
- Sharp (for image processing)
- Multer (file handling)
- Security middleware (Helmet, HPP)

## Getting Started

1. Clone the repository

```bash
git clone <repository-url>
cd image_compressor
```

2. Install dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Start the development server

```bash
# From the root directory
npm run dev
```

This will start both the frontend (port 5173) and backend (port 3000) in development mode.

## Environment Variables

Create a `.env` file in the server directory:

```env
PORT=3000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
