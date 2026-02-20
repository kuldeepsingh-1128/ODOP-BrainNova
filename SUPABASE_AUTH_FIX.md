# Supabase Email Confirmation Fix

The signup error occurs because Supabase has email confirmation enabled by default. Follow these steps to disable it:

## Steps to Fix Email Confirmation Issue

1. **Go to Supabase Dashboard**
   - Open https://app.supabase.com
   - Select your project (ODOP Project)

2. **Navigate to Authentication Settings**
   - Left sidebar → Authentication
   - Click on "Providers"
   - Click on "Email"

3. **Disable Email Confirmation**
   - Look for **"Confirm email"** toggle
   - Make sure it's **DISABLED** (toggle should be OFF/gray)
   - This allows users to sign up and login immediately without email verification

4. **Optional: Enable Email Confirmations Later**
   - If you want email verification in the future, enable this toggle
   - Users will receive a confirmation email they must verify before accessing the app

## After Making Changes

1. **Users can now register immediately** without waiting for email verification
2. **Clear browser cache** (Cmd+Shift+R on Mac)
3. **Try signing up again** with a new email address

## If You Still Get Signup Errors

1. Check the browser console (right-click → Inspect → Console tab)
2. Look for error messages
3. Try using a different email address (previous attempts create rate limits)
4. Wait 15 minutes if you get "rate limit exceeded" error

## Testing Email Address

Once fixed, try registering with:
- **Email:** testuser@example.com
- **Password:** TestPassword123
- **Name:** Test User
- **Phone:** 9999999999

---

**Note:** After registration is working, you can always enable email confirmation in the Auth settings if you want users to verify their email addresses.
