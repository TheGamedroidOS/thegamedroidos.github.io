# Contributing to GameDroid OS 🎮

First off, thank you for considering contributing to GameDroid OS! It's people like you that make GameDroid such a great platform for web-based mobile gaming. We're thrilled to have you join our community.

## 🌟 Why Contribute?

Contributing to GameDroid is a fantastic opportunity for indie web developers to:

- Showcase your HTML5, CSS, and JavaScript skills
- Get your work featured in a beautiful gaming platform
- Collaborate with other developers
- Build your portfolio with meaningful contributions
- Learn about mobile UI/UX and game development patterns

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Environment](#development-environment)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Adding New Games](#adding-new-games)
  - [Improving Existing Games](#improving-existing-games)
  - [UI Enhancements](#ui-enhancements)
  - [Performance Optimizations](#performance-optimizations)
  - [Bug Fixing](#bug-fixing)
  - [Documentation](#documentation)
- [Style Guidelines](#style-guidelines)
- [Pull Request Process](#pull-request-process)
- [Your First Contribution](#your-first-contribution)
- [Community](#community)

## 📜 Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please report unacceptable behavior to [TeamGameDroidOS](mailto:teamgamedroidos@gmail.com).

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/thegamedroidos.github.io
   cd gamedroid
   ```
3. **Set up upstream remote**:
   ```bash
   git remote add upstream https://github.com/original_owner/thegamedroidos.github.io
   ```
4. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/amazing-feature
   ```

## 💻 Development Environment

GameDroid is built with vanilla technologies, so the setup is straightforward:

- **Text Editor/IDE**: VS Code, Sublime Text, or your preferred editor
- **Server**: Any simple HTTP server will work:
  - VS Code Live Server extension
  - Python's `http.server`: `python -m http.server`
  - Node's `http-server`: `npx http-server`
- **Browser Dev Tools**: For testing and debugging

## 🤝 How Can I Contribute?

### Adding New Games

We're always looking for new games! Here's how to add yours:

1. Create a new directory in `/games/your-game-name/`
2. Your game should be contained in this directory with an `index.html` entry point
3. Update the game registry in `script.js`:

```javascript
// Add to drawerOnlyApps array (Avoid adding games on home screen. Currently we don't accept keyboard based games, so optimise your games for mobile)
const drawerOnlyApps = [
  // Existing apps...
  { id: 'yourgame', name: 'Your Game Name', icon: 'fas fa-icon-name' }
];

// Add path to appPaths object
const appPaths = {
  // Existing paths...
  yourgame: '/games/your-game-name/index.html'
};
```
Note: I will made an app centre to display your games to new visitors. Then I may remove less usable games from the app drawer.

- If you have a game or any idea and want us to get a quick look at it, feel free to connect with us at [Mail](mailto:teamgamedroidos@gmail.com).

- Even if you don't have any idea you can fix any typo.

- [Report](mailto:teamgamedroidos@gmail.com) any bug or error

#### Game Development Guidelines

- Keep games lightweight (<500KB recommended)
- Ensure mobile responsiveness (touch controls, flexible layouts)
- Support both portrait and landscape orientations when possible
- Use vanilla JavaScript (no jQuery or other libraries unless absolutely necessary)
- Provide clear instructions for players
- Implement a pause mechanism for when game loses focus

### Improving Existing Games

- Optimize code for better performance
- Add new levels or features
- Improve mobile controls
- Fix bugs or issues

### UI Enhancements

- Improve animations and transitions
- Add new themes or wallpapers
- Enhance accessibility
- Create new icons or visual elements

### Performance Optimizations

- Reduce loading times
- Optimize asset sizes
- Improve rendering performance
- Implement better caching strategies

### Bug Fixing

- Check the [Issue Tracker](https://github.com/thegamedroidos/thegamedroidos.github.io/issues) for bugs
- Test fixes thoroughly across different devices and browsers
- Document the bug and your solution in your PR

### Documentation

- Improve README or CONTRIBUTING docs
- Create tutorials for using specific features
- Document code for future contributors
- Create guides for game developers

## 📐 Style Guidelines

### Code Style

- Use 2 or 4 space indentation (be consistent)
- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing patterns in the codebase

### Commit Messages

- Use clear, descriptive commit messages
- Structure as: `type: subject` (e.g., `feat: add new tetris game`)
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

### JavaScript Style

- Prefer ES6+ features (arrow functions, template literals, etc.)
- Use const/let instead of var
- Comment complex algorithms
- Keep functions small and focused

### CSS Style

- Use CSS variables for theming
- Follow existing naming conventions
- Maintain responsive design principles
- Comment complex selectors or animations

## 🔄 Pull Request Process

1. **Update your fork** with the latest from upstream:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create your feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes** and test thoroughly

4. **Commit your changes**:
   ```bash
   git commit -m "feat: add amazing feature"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request** from your fork to the original repository

7. **Describe your changes** in the PR:
   - What does this PR do?
   - Any special considerations?
   - Screenshots (for UI changes)

8. **Address review comments** and update your PR if needed

## 🌱 Your First Contribution

Not sure where to start? Look for issues labeled `good first issue` or `beginner-friendly`. These are specifically curated for new contributors.

Some easy ways to contribute:
- Add a new wallpaper option
- Fix a small UI bug
- Improve documentation
- Create a simple game like Snake or Pong

## 👥 Community

Join our Telegram channel for getting latest news and updates:

- [Telegram Channel](https://telegram.me/gamedroidcommunity)
- [Instagram](https://instagram.com/gamedroidos)
- [GitHub Discussions](https://github.com/thegamedroidos/thegamedroidos.github.io/discussions)

---

Thank you for contributing to GameDroid OS! Your efforts help to make this project amazing for everyone. We look forward to your creative additions and improvements! 🎮✨