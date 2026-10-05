const fs = require('fs');
const path = require('path');
const pdf2img = require('pdf-img-convert');

const certDir = path.join(__dirname, '..', 'public', 'certificates');

async function convertPdfs() {
  const files = fs.readdirSync(certDir);
  
  for (const file of files) {
    if (file.toLowerCase().endsWith('.pdf')) {
      const pdfPath = path.join(certDir, file);
      const imgName = file.replace(/\.pdf$/i, '.jpg');
      const imgPath = path.join(certDir, imgName);
      
      // Skip if image already exists
      if (fs.existsSync(imgPath)) {
        console.log(`Skipping ${file} - image already exists`);
        continue;
      }
      
      console.log(`Converting ${file}...`);
      try {
        // Convert first page (page 1) to image
        const outputImages = await pdf2img.convert(pdfPath, {
          width: 1200, // Good resolution for certificates
          page_numbers: [1]
        });
        
        fs.writeFileSync(imgPath, outputImages[0]);
        console.log(`Successfully converted ${file} to ${imgName}`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
  console.log('Finished converting all PDFs.');
}

convertPdfs();
