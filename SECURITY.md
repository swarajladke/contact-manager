# Security Guide - MongoDB Connection String

## ⚠️ IMPORTANT: Your MongoDB credentials were exposed!

If your MongoDB connection string was committed to GitHub, you **MUST** take immediate action:

### Step 1: Change Your MongoDB Password (URGENT)

1. **Go to MongoDB Atlas**
   - Visit https://cloud.mongodb.com
   - Log in to your account

2. **Change Database User Password**
   - Go to **Database Access** (left sidebar)
   - Find your database user (e.g., `swarajladke20_db_user`)
   - Click **Edit** → **Edit Password**
   - Generate a new strong password
   - **Save the new password securely**

3. **Update Connection String**
   - Go to **Database** → **Connect**
   - Click **Connect your application**
   - Copy the new connection string with your new password
   - Update it in your environment variables (see below)

### Step 2: Use Environment Variables (Never Hardcode!)

**✅ DO THIS:**
- Store MongoDB URI in `.env` file (local development)
- Store MongoDB URI in Render environment variables (production)
- Add `.env` to `.gitignore` (already done)

**❌ NEVER DO THIS:**
- Don't commit `.env` files to GitHub
- Don't hardcode connection strings in code
- Don't share credentials in code comments

### Step 3: Local Development Setup

1. **Create `.env` file in `server/` directory:**
   ```bash
   cd server
   touch .env
   ```

2. **Add your MongoDB connection string:**
   ```
   MONGO_URI=mongodb+srv://username:NEW_PASSWORD@cluster0.xxxxx.mongodb.net/contactManager?retryWrites=true&w=majority
   ```

3. **Verify `.env` is in `.gitignore`** (already configured)

### Step 4: Production Setup (Render)

1. **Go to Render Dashboard**
   - Open your backend service
   - Go to **Environment** tab

2. **Update MONGO_URI:**
   - Find `MONGO_URI` environment variable
   - Update with your new connection string (with new password)
   - Click **Save Changes**
   - Service will automatically redeploy

### Step 5: Verify No Credentials in Code

Run this command to check for any remaining hardcoded credentials:
```bash
grep -r "mongodb+srv" . --exclude-dir=node_modules --exclude="*.md"
```

If you see any results, remove them immediately!

### Step 6: Check Git History

Even after removing credentials, they may still be in Git history. Consider:

1. **If repository is private:** Less urgent, but still change password
2. **If repository is public:** 
   - Change password immediately
   - Consider using GitHub's secret scanning
   - You may want to create a new database user

## Best Practices Going Forward

1. ✅ Always use environment variables
2. ✅ Never commit `.env` files
3. ✅ Use `.env.example` for documentation (without real credentials)
4. ✅ Rotate passwords regularly
5. ✅ Use MongoDB Atlas IP whitelist (restrict to Render IPs if possible)
6. ✅ Enable MongoDB Atlas monitoring/alerts

## Current Status

- ✅ Code updated to require `MONGO_URI` environment variable
- ✅ No hardcoded credentials in code
- ✅ `.gitignore` configured to exclude `.env` files
- ⚠️ **ACTION REQUIRED:** Change your MongoDB password immediately!

