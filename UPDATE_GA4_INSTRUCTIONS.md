# How to Update Your Google Analytics 4 Measurement ID

## Step 1: Get Your Measurement ID from Google Analytics

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click ⚙️ **Admin** (bottom left)
3. Under "Property" column, click **Data Streams**
4. Click your "honeydew" stream
5. At the top, you'll see:
   ```
   MEASUREMENT ID
   G-XXXXXXXXXX    [Copy button]
   ```
6. Click the copy button to copy it

## Step 2: Update Your Website Code

Open `/Users/peterghiorse/HoneydewWebsite/index.html` and:

**Replace on Line 21:**
```html
<!-- BEFORE: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>

<!-- AFTER: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-REAL-ID"></script>
```

**Replace on Line 26:**
```html
<!-- BEFORE: -->
gtag('config', 'G-XXXXXXXXXX', {

<!-- AFTER: -->
gtag('config', 'G-YOUR-REAL-ID', {
```

## Step 3: Test It

1. Save the file
2. Deploy to production:
   ```bash
   git add index.html
   git commit -m "Add real GA4 Measurement ID"
   git push
   ```

3. Visit your live website: https://gethoneydew.app
4. Wait 5-10 minutes
5. Check Google Analytics → Reports → Realtime
6. You should see your visit!

## Troubleshooting

**"Data collection isn't active" warning?**
- This appears because the code hasn't been deployed yet
- After you update and deploy, wait 24-48 hours for the warning to disappear
- You can test immediately using "Realtime" reports

**Not seeing data in Realtime?**
- Open your live website: https://gethoneydew.app
- Open Google Analytics → Reports → Realtime (in another tab)
- You should see "1 user" (you!) appear within 30 seconds

**Need help?**
- Share your Measurement ID and I can update the code for you
- Make sure you're viewing the LIVE site (gethoneydew.app), not localhost

