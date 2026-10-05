# Pratik Giri — Developer Portfolio

A modern, premium portfolio website built with React.js + Vite + Tailwind CSS.

## 🚀 Tech Stack

- **React 18** + **Vite** — Fast development & build
- **Tailwind CSS** — Utility-first styling with custom design tokens
- **Framer Motion** — Smooth, professional animations
- **Lucide React** — Clean, consistent icons

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Sticky nav with glassmorphism + dark mode
│   ├── Hero.jsx          # Animated hero with gradient text
│   ├── About.jsx         # Bio, stats, journey timeline
│   ├── TechStack.jsx     # Categorized tech cards
│   ├── Projects.jsx      # Filterable project grid
│   ├── Certificates.jsx  # Certificate gallery + lightbox modal
│   ├── Achievements.jsx  # Achievement cards
│   ├── Contact.jsx       # Contact form + social links
│   └── Footer.jsx        # Footer
├── data/
│   ├── projects.js       # Project data (edit this!)
│   ├── technologies.js   # Tech stack data
│   ├── certificates.js   # Certificate data + stats
│   └── achievements.js   # Achievements + social links + timeline
├── assets/
└── App.jsx
```

## ✏️ Customization

### Update Your Info

1. **Social Links & Contact** → `src/data/achievements.js`
   - Update `socialLinks` with your GitHub, LinkedIn, LeetCode, Kaggle URLs
   - Update `contactInfo.email` with your email

2. **Projects** → `src/data/projects.js`
   - Add/edit project entries with your real GitHub links

3. **Certificates** → `src/data/certificates.js`
   - Place certificate images in `/public/certificates/`
   - Update certificate entries with real titles, organizations, dates

4. **Achievements** → `src/data/achievements.js`
   - Replace placeholder achievements with your real ones

5. **Stats** → `src/data/certificates.js`
   - Update `stats` values to reflect your real numbers

### Add Certificate Images

1. Place your certificate images (JPG/PNG/WebP) in `/public/certificates/`
2. Update `src/data/certificates.js`:
   ```js
   image: "/certificates/your-cert-file.jpg"
   ```

## 🛠️ Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Deploy — it's automatic!

Or use Vercel CLI:
```bash
npx vercel --prod
```

## 🌗 Dark/Light Mode

Theme is stored in `localStorage`. Defaults to dark mode. Toggle with the button in the navbar.

## 📄 License

MIT
