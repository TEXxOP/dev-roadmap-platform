# Dev Roadmap Platform

A comprehensive learning ecosystem designed to empower junior developers, students, and tech enthusiasts in their career journey. The platform combines AI-powered interview practice, structured learning roadmaps, community-driven blogs, and professional portfolio building into one seamless experience.

**Built by Harish Saini** - UPES Student

## Overview

Dev Roadmap Platform addresses key challenges in developer education by providing structured career paths, realistic interview practice with AI feedback, achievement tracking systems, and community-driven knowledge sharing. The platform serves as a complete learning hub for developers at all stages of their careers.

## Features

### Core Platform Features
- **Interactive Roadmaps** - Structured learning paths with comprehensive progress tracking
- **AI Interview Practice** - Realistic interview simulation powered by Google Gemini AI
- **Blog Platform** - Community-driven content creation with admin moderation
- **Certificate System** - Professional certificates for completed roadmaps using Canvas API
- **User Profiles** - Comprehensive progress tracking and achievement showcasing
- **Admin Dashboard** - Complete content management and user administration system

### Authentication & Security
- Complete authentication flow with email verification
- JWT-based secure authentication system
- Comprehensive password management and recovery

### Advanced Features
- Speech recognition for real-time interview feedback
- Text-to-speech for immersive learning experience
- Performance analytics and leaderboards
- Real-time progress tracking and achievements

## Technology Stack

### Frontend
- **Next.js 14** with App Router for server-side rendering
- **React 18** with modern hooks and Context API
- **TypeScript** for type safety and enhanced developer experience
- **Tailwind CSS** with Glassmorphism design system
- **Framer Motion** for smooth animations
- **GSAP & Locomotive Scroll** for advanced scrolling effects

### Backend
- **Next.js API Routes** for serverless backend architecture
- **MongoDB Atlas** with Mongoose ODM for data persistence
- **JWT Authentication** with comprehensive session management
- **Cloudinary** for efficient image management and optimization
- **Nodemailer** for reliable email services

### AI & Advanced Integrations
- **Google Gemini AI** for intelligent interview feedback and assessment
- **Web Speech API** for text-to-speech and speech recognition capabilities
- **Canvas API** for dynamic certificate generation
- **Content Filtering** with advanced moderation systems
- **Real-time Analytics** for performance monitoring

## Prerequisites

- Node.js 18 or higher
- MongoDB database (local installation or MongoDB Atlas account)
- Cloudinary account for image management
- Google Gemini AI API key for interview features
- Gmail account with app-specific password for email services

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dev-roadmap-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   MONGO_URI=your-mongodb-connection-string
   TOKEN_SECRET=your-jwt-secret-key
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-cloudinary-key
   CLOUDINARY_API_SECRET=your-cloudinary-secret
   GEMINI_API_KEY=your-google-gemini-key
   NEXTAUTH_URL=http://localhost:3000
   BASE_URL=http://localhost:3000
   DOMAIN=http://localhost:3000
   NODE_ENV=development
   ADMIN_EMAIL=your-admin-email@example.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint for code quality checks

## Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── api/               # API routes for backend functionality
│   ├── auth/              # Authentication pages and flows
│   ├── admin/             # Admin dashboard and management
│   ├── blogs/             # Blog system and content management
│   ├── explore/           # Roadmap exploration interface
│   ├── interview/         # AI interview practice system
│   ├── profile/           # User profile management
│   └── ...               # Additional application pages
├── components/            # Reusable UI components
│   ├── component/         # Core UI components
│   ├── sections/          # Page sections and layouts
│   └── ui/               # UI elements and effects
├── context/               # React Context providers for state management
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries and configurations
├── models/                # MongoDB data models and schemas
├── helpers/               # Helper functions and utilities
└── dbConfig/             # Database configuration and connection
```

## Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run deployment: `vercel`
3. Configure environment variables in Vercel dashboard
4. Update domain URLs in environment variables

### Alternative Platforms
- **Netlify** - Connect your GitHub repository for automatic deployments
- **Railway** - One-click deployment with database hosting
- **Heroku** - Traditional PaaS deployment with CLI tools
- **DigitalOcean App Platform** - Cost-effective deployment solution

## Environment Variables

### Required Variables
- `MONGO_URI` - MongoDB connection string
- `TOKEN_SECRET` - JWT secret key (minimum 32 characters)
- `EMAIL_USER` & `EMAIL_PASS` - Gmail SMTP credentials
- `CLOUDINARY_*` - Cloudinary API credentials for image management
- `ADMIN_EMAIL` - Administrator email address

### Optional Variables
- `GEMINI_API_KEY` - Google Gemini AI API key for interview features
- `VERCEL_ANALYTICS_ID` - Vercel Analytics integration
- `DEBUG` - Enable/disable debug logging

## Security Features

- JWT-based authentication with secure token management
- Email verification for account security
- Password hashing using bcryptjs
- Input validation and sanitization
- Rate limiting for API protection
- CORS configuration for cross-origin security
- Environment variable protection
- Security headers implementation

## Performance Optimizations

- Core Web Vitals optimization
- Image optimization with Next.js Image component
- Code splitting for improved load times
- Efficient caching strategies
- Bundle optimization and tree shaking
- Lazy loading for enhanced performance

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/feature-name`)
3. Commit your changes (`git commit -m 'Add feature description'`)
4. Push to the branch (`git push origin feature/feature-name`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Harish Saini**
- Portfolio: [harish-saini.vercel.app](https://harish-saini.vercel.app)
- GitHub: [github.com/TEXxOP](https://github.com/TEXxOP)
- LinkedIn: [linkedin.com/in/harish-saini-3469031a5](https://www.linkedin.com/in/harish-saini-3469031a5)
- University: UPES (University of Petroleum and Energy Studies)

## Support

For support, issues, or feature requests, please contact the development team or create an issue in the project repository.

---

Built with modern web technologies by Harish Saini - UPES Student