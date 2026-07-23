# Xinrong Electric Tools - B2B Foreign Trade Website

Professional B2B lithium power tools foreign trade standalone website for **Xinrong Electric Tools (Weifang) Co., Ltd.**

## Tech Stack

- **Frontend:** Static HTML5 + CSS3 + Vanilla JavaScript
- **Backend/Database:** Supabase (PostgreSQL)
- **CDN:** jsDelivr (Supabase JS client)
- **Deployment:** Cloudflare Pages

## Project Structure

```
project/
├── index.html          # Homepage
├── products.html       # Products catalog
├── solutions.html      # OEM/ODM solutions
├── about.html          # Company profile & timeline
├── contact.html        # Contact form & company info
├── dashboard.html      # Inquiry dashboard (password-protected)
├── css/
│   └── style.css       # Main stylesheet (design tokens, layout, responsive)
├── js/
│   ├── supabase.js     # Supabase client configuration
│   └── main.js         # Shared UI logic (nav, forms, animations)
├── images/
│   └── placeholder.svg # Placeholder product image
└── README.md           # This file
```

## Supabase Integration

### Database Schema

**Table: `inquiries`**

| Column      | Type                   | Description                |
|-------------|------------------------|----------------------------|
| id          | UUID (PK, auto-gen)   | Unique inquiry ID          |
| name        | TEXT (NOT NULL)        | Contact name               |
| company     | TEXT                   | Company name               |
| email       | TEXT (NOT NULL)        | Contact email              |
| whatsapp    | TEXT                   | WhatsApp number            |
| product     | TEXT                   | Product of interest        |
| quantity    | TEXT                   | Estimated quantity         |
| message     | TEXT                   | Inquiry message            |
| created_at  | TIMESTAMPTZ (auto)     | Submission timestamp       |

### Row Level Security (RLS)

- **INSERT:** Public access allowed (anyone can submit inquiries)
- **SELECT:** Authenticated access only

### Supabase Project

- **Project URL:** `https://tmdlcmfqsiahqcodxcbf.supabase.co`
- **Region:** ap-northeast-2 (Seoul)

## Cloudflare Pages Deployment

### Prerequisites

1. A [Cloudflare account](https://dash.cloudflare.com/sign-up)
2. A Git repository (GitHub/GitLab) with this project
3. Custom domain (optional): `xinrongtools.com`

### Deployment Steps

1. **Push to GitHub/GitLab:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Xinrong Electric Tools website"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → Pages
   - Click "Create a project" → "Connect to Git"
   - Select your repository
   - Configure build settings:
     - **Build command:** (leave empty - static site)
     - **Build output directory:** `/` (root)
     - **Root directory:** (leave empty)
   - Click "Save and Deploy"

3. **Custom Domain (optional):**
   - In Pages → your project → Custom domains
   - Add `xinrongtools.com` (or subdomain)
   - Follow Cloudflare DNS instructions

### Local Preview

For local development, use any static file server:

```bash
# Python 3
python3 -m http.server 8080

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8080
```

Then open `http://localhost:8080` in your browser.

## Pages & SEO

| Page | Title | Meta Description |
|------|-------|-----------------|
| index.html | Xinrong Electric Tools - Professional Lithium Power Tools Manufacturer | 20+ years OEM/ODM experience, ISO9001 certified |
| products.html | Products - Xinrong Electric Tools | Full catalog of lithium power tools |
| solutions.html | OEM/ODM Solutions - Xinrong | Custom manufacturing services |
| about.html | About Us - Xinrong Electric Tools | Company history & certifications |
| contact.html | Contact Us - Xinrong Electric Tools | Inquiry form & company info |

### Structured Data

- **Organization** (index.html): Company name, address, founding date
- **CollectionPage** (products.html): Product catalog metadata
- **AboutPage** (about.html): Company about page
- **ContactPage** (contact.html): Contact page metadata

## Dashboard Access

The inquiry dashboard is at `dashboard.html` and is password-protected.

- **Default password:** `xinrong2024`
- **To change:** Edit the `DASH_PASSWORD` variable in `dashboard.html`

The dashboard displays:
- Total inquiries, today's count, weekly count, product types
- Full inquiry table with date, name, company, email, product, quantity, and message

## Customization

### Brand Colors

Edit CSS variables in `css/style.css`:

```css
:root {
  --color-primary: #1e3a5f;      /* Deep blue */
  --color-accent: #f97316;       /* Orange */
  --color-gray-500: #64748b;     /* Gray */
}
```

### Product Images

Replace placeholder images in `images/` with your actual product photos. Recommended sizes:
- Product cards: 560×440px
- Factory images: 800×480px
- Hero background: 1920×800px

### Email Notification

To add email notification for new inquiries, create a Supabase Edge Function:

1. Install Supabase CLI
2. Create Edge Function for email sending (using Resend, SendGrid, etc.)
3. Deploy via `supabase functions deploy`

## License

Private - Xinrong Electric Tools (Weifang) Co., Ltd. All rights reserved.
