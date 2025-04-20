# CareerQuest - Career Development Platform

CareerQuest is a modern web application built with Next.js that helps users plan and develop their career paths. The platform provides personalized career roadmaps, skill recommendations, and development strategies based on user profiles.

## 🌟 Features

### 1. Interactive Profile Setup
- Multi-step form with progress tracking
- Smooth transitions and animations
- Real-time validation
- Responsive design

### 2. Comprehensive Data Collection
- Basic Information
- Educational Qualifications
  - 10th Grade details
  - 12th Grade details with stream selection
  - Higher Education information
- Skills Assessment
  - Current skills inventory
  - Tools and technologies proficiency
- Career Interests
  - Preferred field/domain
  - Dream role/position
- Additional Information
  - Work experience
  - Learning preferences
  - Language proficiency

### 3. Personalized Career Roadmap
- Automated PDF generation
- Custom recommendations based on:
  - Educational background
  - Current skill set
  - Career interests
  - Industry trends
- Includes:
  - Profile summary
  - Recommended skills
  - Career path suggestions
  - Step-by-step development roadmap

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/careerquest.git
cd careerquest
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - UI component library
- [PDF-Lib](https://pdf-lib.js.org/) - PDF generation
- [Lucide React](https://lucide.dev/) - Beautiful icons

## 📦 Project Structure

```
careerquest/
├── components/
│   ├── user-registration-form.jsx    # Main form component
│   ├── career-roadmap-pdf.jsx        # PDF generation component
│   └── ui/                           # UI components
├── public/
│   └── assets/                       # Static assets
├── styles/
│   └── globals.css                   # Global styles
└── pages/
    └── index.js                      # Main page
```

## 🎯 Key Features Explained

### Multi-step Form
- Intuitive navigation between form sections
- Progress tracking with visual indicator
- Data persistence between steps
- Form validation for required fields

### PDF Generation
- Custom-generated career roadmap
- Professional formatting
- Downloadable PDF format
- Personalized recommendations

### Performance Optimizations
- Lazy loading of components
- Code splitting
- Optimized bundle size
- Efficient state management
- Loading states and feedback

## 🔧 Configuration

The application can be configured through environment variables:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_PDF_STORAGE=your_storage_path
```

## 💡 Usage Tips

1. Fill out all mandatory fields (marked with *)
2. Provide detailed information for better recommendations
3. Review your inputs before submission
4. Download and save your career roadmap PDF

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape CareerQuest
- Special thanks to the open-source community for the amazing tools and libraries

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Made with ❤️ by [Your Name/Team]
