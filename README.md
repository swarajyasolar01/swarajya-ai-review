# Swarajya AI Review Assistant

A mobile-friendly review-drafting site for Swarajya Solar Services. It uses a Cloudflare Pages Function to call Gemini from the server; the API key is never placed in browser code.

## Included
- Marathi, Hindi and English
- Customer-entered experience details
- AI draft generated only from those details
- Copy button and direct Google review link
- No forced star rating and no fabricated claims

## Deploy free (subject to provider free-tier limits)
1. Create a Cloudflare account and a GitHub account.
2. Create a GitHub repository and upload the contents of this folder.
3. In Cloudflare, go to Workers & Pages → Create → Pages → Connect to Git.
4. Select the repository. Framework preset: None. Build command: leave blank. Build output directory: `/`.
5. After deployment, open the Pages project → Settings → Variables and Secrets → add an encrypted secret named `GEMINI_API_KEY`.
6. Create a Gemini API key in Google AI Studio and paste it into the Cloudflare secret field. Never put the key in `index.html`, GitHub, or a QR code.
7. Redeploy (or trigger a new deployment) and test the site.

## Google review destination
The current button uses the review link supplied by the owner:
https://g.page/r/CezK92iIQdRIEBM/review

## Important
- The live AI draft requires a valid Gemini API key and provider access/quotas. Free-tier availability and limits can change.
- Hosting may have free-tier limits; no provider is guaranteed to remain free indefinitely.
- This tool drafts wording. Customers must review, edit if needed, and choose whether to publish their own honest review.
