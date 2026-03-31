# Ajithkumar V — Portfolio

Dark, minimal developer portfolio built with React + Vite.

## Setup

```bash
npm install
npm run dev
```

## Before deploying — do these 3 things:

### 1. Add your EmailJS credentials
In `src/App.jsx`, find the Contact section and replace:
```js
emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formRef.current, "YOUR_PUBLIC_KEY")
```

Get these from https://emailjs.com (free plan is enough):
- Create account → Add Email Service → Create Template
- Template variables needed: `{{name}}`, `{{email}}`, `{{message}}`

### 2. Add your real GitHub and LinkedIn links
In the Footer section of `src/App.jsx`, replace:
```jsx
["GitHub", "https://github.com/YOUR_USERNAME"]
["LinkedIn", "https://linkedin.com/in/YOUR_USERNAME"]
```

### 3. Deploy to Netlify
```bash
npm run build
# Then drag the `dist` folder to netlify.com/drop
```
Or connect your GitHub repo to Netlify for auto-deploy on every push.

## Customization
- Colors: Edit the `C` object at the top of `App.jsx`
- Projects: Edit the `PROJECTS` array
- Skills: Edit the `SKILLS` array
