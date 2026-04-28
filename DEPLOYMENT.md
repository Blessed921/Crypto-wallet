# MyToken Crypto Wallet - Deployment Guide

## Overview
This is a modern, responsive React-based cryptocurrency wallet application built with Vite, Tailwind CSS, and ethers.js. It supports ERC-20 token transfers and wallet connectivity via MetaMask.

## Prerequisites
- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **MetaMask**: Browser extension installed for wallet interactions
- **Smart Contract**: Deployed ERC-20 contract on your target network

## Environment Setup

### 1. Frontend Configuration
Create a `.env.local` file in the `/frontend` directory:

```bash
# Smart Contract Address (required)
VITE_CONTRACT_ADDRESS=0x...your_contract_address...

# RPC Provider (optional, defaults to MetaMask provider)
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Network Chain ID (optional)
VITE_NETWORK_ID=11155111
```

### 2. Smart Contract Deployment
If you haven't deployed the MyToken contract yet:

```bash
# From the root directory
npx hardhat run scripts/deploy.js --network sepolia
```

The contract address will be output to the console. Update `.env.local` with this address.

## Build & Deployment

### Development Mode
```bash
cd frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`

### Production Build
```bash
cd frontend
npm install
npm run build
npm run preview
```

The optimized build will be in the `frontend/dist` directory.

## Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from root directory
vercel --cwd frontend
```

Environment variables can be set in Vercel dashboard:
- Go to Project Settings > Environment Variables
- Add `VITE_CONTRACT_ADDRESS`, `VITE_RPC_URL`, etc.

### Option 2: GitHub Pages
1. Push code to GitHub
2. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
})
```
3. Add GitHub Actions workflow (`.github/workflows/deploy.yml`)
4. Run: `npm run build`

### Option 3: Netlify
1. Connect your GitHub repo to Netlify
2. Build settings:
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/dist`
3. Add environment variables in Netlify dashboard

### Option 4: Self-Hosted (AWS, Digital Ocean, etc.)
```bash
# Build the app
cd frontend && npm run build

# Copy dist folder to your server
scp -r frontend/dist user@server:/var/www/mytoken-wallet

# Configure web server (nginx example)
# See nginx.conf example below
```

## nginx Configuration Example
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        root /var/www/mytoken-wallet;
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Performance Optimizations

### Included:
- ✅ Minified bundle (164.6 KB gzipped)
- ✅ Code splitting via Vite
- ✅ CSS optimization with Tailwind purging
- ✅ Image optimization ready
- ✅ Lazy loading for components

### Bundle Analysis:
```bash
npm install -g vite-plugin-visualizer
# Add to vite.config.js and rebuild
```

## Security Considerations

1. **Never expose private keys** - Use MetaMask for key management
2. **HTTPS only** - Always use HTTPS in production
3. **Environment variables** - Never commit `.env.local` to git
4. **Contract verification** - Verify contract addresses before transactions
5. **Network validation** - App checks connected network
6. **Input validation** - All user inputs are validated

## Monitoring & Errors

### Error Handling:
- Transaction failures are caught and displayed to users
- Network errors show helpful messages
- Invalid addresses/amounts are validated client-side

### Analytics (Optional):
Sentry integration ready (set `VITE_SENTRY_DSN` env var)

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Contract not found
- Verify `VITE_CONTRACT_ADDRESS` is set correctly
- Check contract is deployed on the connected network
- Ensure ABI matches deployed contract

### MetaMask not detected
- Install MetaMask browser extension
- Refresh the page
- Check browser console for errors

### Build fails
- Clear `node_modules`: `rm -rf node_modules && npm install`
- Clear cache: `npm run build -- --force`
- Check Node version: `node --version`

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Contract address verified
- [ ] Tested on testnet first
- [ ] MetaMask connectivity verified
- [ ] Transfer functionality tested
- [ ] Error messages working
- [ ] Mobile responsiveness verified
- [ ] Analytics configured (if using)
- [ ] Backup of deployment credentials

## Support

For issues or questions:
1. Check browser console (F12)
2. Check network tab for failed requests
3. Verify contract address and ABI
4. Test on testnet first (Sepolia recommended)

---

**Last Updated**: March 5, 2026
**App Version**: 1.0.0
