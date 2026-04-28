# 🚀 Quick Start - Deploy in 5 Minutes

## For the Impatient

### Step 1: Configure Contract Address (2 min)
```bash
cd frontend
cat > .env.local << EOF
VITE_CONTRACT_ADDRESS=0x...YOUR_CONTRACT_ADDRESS...
EOF
```

### Step 2: Build (1 min)
```bash
npm install
npm run build
```

### Step 3: Deploy (2 min)

**Option A: Vercel (Easiest)**
```bash
npm install -g vercel
vercel --cwd frontend
# Follow the prompts
```

**Option B: Netlify (Git-based)**
- Push to GitHub
- Connect repo in Netlify dashboard
- Set env variable `VITE_CONTRACT_ADDRESS`
- Deploy ✅

**Option C: Local Testing**
```bash
npm run preview
# Opens at http://localhost:4173
```

---

## Verify It Works ✅

1. Load your deployed URL
2. Click "Connect MetaMask"
3. Check you see your balance
4. Try a small transfer (testnet recommended)
5. See success message

---

## Still Not Working?

### Check 1: Contract Address
```bash
# Make sure VITE_CONTRACT_ADDRESS is set
echo $VITE_CONTRACT_ADDRESS
# Should output: 0x...
```

### Check 2: Network
- MetaMask must be connected to correct network
- Check if contract deployed on that network
- Look at NetworkStatus indicator on app

### Check 3: Browser Console
- Press F12 > Console tab
- Look for red error messages
- Common issues:
  - "Contract not found" → wrong address
  - "MetaMask not detected" → install extension
  - "Network mismatch" → switch to correct network

### Check 4: Build Output
```bash
# Check dist folder was created
ls frontend/dist/
# Should have: index.html, assets/
```

---

## Deployment Checklist

- [ ] Contract deployed on network
- [ ] Contract address obtained
- [ ] `.env.local` created with address
- [ ] Build succeeds: `npm run build`
- [ ] Deploy to platform (Vercel/Netlify/etc)
- [ ] Site loads at public URL
- [ ] MetaMask connects
- [ ] Balance displays
- [ ] Network shows correctly

---

## File Structure After Build

```
frontend/
├── dist/                    ← Upload this folder to hosting
│   ├── index.html
│   └── assets/
│       ├── index-xxx.js     (minified app)
│       └── index-xxx.css    (minified styles)
├── src/                     (source, not needed in production)
├── node_modules/            (not needed)
├── package.json
└── .env.local               (must have CONTRACT_ADDRESS)
```

---

## Environment Variables

Only one is **required**:

```env
# REQUIRED - Your deployed contract address
VITE_CONTRACT_ADDRESS=0x...

# OPTIONAL - Custom RPC provider
# If not set, uses MetaMask provider
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY

# OPTIONAL - Chain ID
VITE_NETWORK_ID=11155111
```

---

## After Deployment

1. Test on testnet first (Sepolia recommended)
2. Verify all features work
3. Test MetaMask connection
4. Test balance display
5. Test small transfer
6. Check mobile responsiveness
7. Test on different browsers

Once everything works → Deploy to mainnet!

---

## Troubleshooting Flowchart

```
App not loading?
├─ Check console (F12)
└─ Try force reload (Ctrl+Shift+R)

Balance not showing?
├─ MetaMask connected?
├─ Correct network selected?
└─ Contract address correct?

Transfer failing?
├─ Recipient address valid?
├─ Amount valid (positive)?
├─ Wallet has balance?
└─ Network matches contract?

Still stuck?
└─ See DEPLOYMENT.md or CHECKLIST.md
```

---

## One-Liner Deployment Commands

**Vercel:**
```bash
vercel --cwd frontend
```

**Netlify:**
```bash
# Push to GitHub, then connect in dashboard
git push origin main
```

**Local Test:**
```bash
cd frontend && npm install && npm run build && npm run preview
```

---

## Support

- **See Error?** → Check browser console (F12)
- **Build Failed?** → Run `npm install` again
- **Not Working?** → Check `VITE_CONTRACT_ADDRESS` is set
- **Need Help?** → See DEPLOYMENT.md

---

**Status: ✅ READY FOR PRODUCTION**

Generated: March 5, 2026
