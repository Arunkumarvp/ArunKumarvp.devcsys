# Adding Your Resume PDF

To enable the resume download functionality:

1. **Create or export your resume as a PDF file**
   - Name it `resume.pdf`
   - Keep the file size reasonable (under 500KB recommended)

2. **Place the PDF in the project root directory**
   ```bash
   cp /path/to/your/resume.pdf /home/dev/project/site/resume.pdf
   ```

3. **Update the download button link**
   
   In `index.html`, find this line (around line 125):
   ```html
   <a href="#" id="resume-download-btn" class="download-btn" data-physics="true">
   ```
   
   Change it to:
   ```html
   <a href="resume.pdf" id="resume-download-btn" class="download-btn" data-physics="true" download>
   ```

4. **Optional: Update the file size display**
   
   Find this line:
   ```html
   <span class="download-size">[PDF • 152KB]</span>
   ```
   
   Update with your actual file size.

5. **Test locally**
   ```bash
   # Open in browser and click the download button
   # The PDF should download automatically
   ```

## Alternative: External Hosting

If you prefer to host your resume elsewhere (Google Drive, Dropbox, etc.):

1. Upload your resume and get a direct download link
2. Update the `href` attribute with that link:
   ```html
   <a href="https://your-hosting-service.com/resume.pdf" ...>
   ```

## For GitHub Pages

GitHub Pages will automatically serve the `resume.pdf` file if it's in your repository root.

---

**Note:** The current implementation shows a helpful message in the terminal when clicked, instructing users to add their resume PDF.
