# CarPrep - Ontario Driving Test PWA

A comprehensive Progressive Web App (PWA) for preparing for the Ontario G1 and G2 driving tests. Study offline, practice with flashcards, and take realistic practice tests.

## Features

### 📚 Study Guide
- 7 comprehensive chapters from the MTO Driver's Handbook
- 51 detailed sections covering all driving topics
- Custom illustrations for each chapter
- Expandable sections for easy navigation

### 🎴 Flashcards
- Interactive flashcards for memorizing key concepts
- Flip cards to reveal answers
- Track your progress

### ✅ Practice Tests
- 55 comprehensive practice questions
- Detailed explanations for each answer
- Immediate feedback on your answers
- Progress tracking

### 🎲 Test Generator
- Generates random 30-question tests
- Shuffles questions for variety
- Pass/fail results based on 80% threshold
- Simulates the real G1 test format

### 📱 PWA Features
- **Offline Access**: Study anywhere, anytime
- **Installable**: Add to your home screen
- **Fast Loading**: Optimized performance
- **Responsive**: Works on all devices

## Getting Started

### Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   - Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Deployment

This app is configured for easy deployment to GitHub Pages.

### Quick Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Automated (GitHub Actions):**
1. Push to GitHub
2. Enable GitHub Pages with "GitHub Actions" as source
3. Automatic deployment on every push to main

**Manual:**
```bash
npm run deploy
```

## Project Structure

```
carprep/
├── public/              # Static assets
│   └── images/         # Chapter illustrations
├── src/
│   ├── components/     # React components
│   ├── data/          # JSON data files
│   │   ├── handbook.json    # Study guide content
│   │   ├── questions.json   # Practice questions
│   │   └── flashcards.json  # Flashcard data
│   ├── pages/         # Page components
│   │   ├── Home.tsx
│   │   ├── Guide.tsx
│   │   ├── Flashcards.tsx
│   │   ├── Practice.tsx
│   │   └── TestGenerator.tsx
│   └── db/            # IndexedDB utilities
├── .github/
│   └── workflows/     # GitHub Actions
└── DEPLOYMENT.md      # Deployment guide
```

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **IndexedDB** - Offline storage
- **Vite PWA Plugin** - PWA functionality

## License

This project is for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

