# GitHub Pages Deployment Guide

This guide explains how to deploy your CarPrep PWA to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your computer
3. Your project pushed to a GitHub repository

## Deployment Methods

### Method 1: Automated Deployment (Recommended)

The app is configured with GitHub Actions for automatic deployment.

**Setup Steps:**

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/carprep.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Build and deployment":
     - Source: Select **GitHub Actions**
   - Save the settings

3. **Automatic Deployment:**
   - Every push to the `main` branch will automatically trigger a deployment
   - The workflow file is located at `.github/workflows/deploy.yml`
   - You can monitor deployment progress in the **Actions** tab

4. **Access your app:**
   - Your app will be available at: `https://YOUR_USERNAME.github.io/carprep/`
   - It may take a few minutes for the first deployment

### Method 2: Manual Deployment

You can also deploy manually using the npm script:

```bash
npm run deploy
```

This will:
1. Build the production version
2. Deploy to the `gh-pages` branch
3. Make it available on GitHub Pages

**Note:** For manual deployment, you need to set GitHub Pages source to "Deploy from a branch" and select the `gh-pages` branch.

## Configuration Details

### Vite Configuration

The `vite.config.ts` has been configured with the correct base path:

```typescript
base: process.env.NODE_ENV === 'production' ? '/carprep/' : '/'
```

This ensures all assets load correctly when deployed to GitHub Pages.

### Package.json Scripts

- `npm run dev` - Run development server
- `npm run build` - Build for production
- `npm run deploy` - Build and deploy to GitHub Pages (manual method)

## Troubleshooting

### Assets not loading

If images or other assets aren't loading:
- Verify the `base` path in `vite.config.ts` matches your repository name
- Check that all asset paths are relative (not absolute)

### 404 errors

If you get 404 errors:
- Ensure GitHub Pages is enabled in repository settings
- Verify the source is set to "GitHub Actions" or "gh-pages branch"
- Check that the deployment workflow completed successfully

### Build failures

If the build fails:
- Check the Actions tab for error logs
- Ensure all dependencies are listed in `package.json`
- Verify Node.js version compatibility (v20 is used in the workflow)

## Updating the App

To update your deployed app:

**Automated (GitHub Actions):**
```bash
git add .
git commit -m "Update app"
git push
```

**Manual:**
```bash
npm run deploy
```

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public` folder with your domain name
2. Configure DNS settings with your domain provider
3. Enable "Enforce HTTPS" in GitHub Pages settings

## Environment Variables

If you need environment variables:
- Add them to GitHub repository secrets (Settings → Secrets and variables → Actions)
- Reference them in the workflow file using `${{ secrets.YOUR_SECRET }}`

## PWA Considerations

The app is configured as a Progressive Web App (PWA):
- Service worker will cache assets for offline use
- Users can install it on their devices
- Make sure to update the version in `package.json` when making changes

## Support

For issues with deployment:
- Check GitHub Actions logs in the Actions tab
- Review GitHub Pages documentation: https://docs.github.com/pages
- Verify all configuration files are committed to the repository
