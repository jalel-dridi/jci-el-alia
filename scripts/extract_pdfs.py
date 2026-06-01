import PyPDF2
import os
import json

reports_dir = "content/annual-reports"
output_dir = "content/annual-reports/extracted"
os.makedirs(output_dir, exist_ok=True)

pdf_files = [f for f in os.listdir(reports_dir) if f.endswith('.pdf')]
print(f"Found {len(pdf_files)} PDF files:")

all_extracted = {}

for pdf_file in sorted(pdf_files):
    filepath = os.path.join(reports_dir, pdf_file)
    print(f"\n{'='*60}")
    print(f"Processing: {pdf_file}")
    print(f"{'='*60}")
    
    try:
        with open(filepath, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            num_pages = len(reader.pages)
            print(f"  Pages: {num_pages}")
            
            full_text = ""
            for i, page in enumerate(reader.pages):
                text = page.extract_text()
                if text:
                    full_text += f"\n--- Page {i+1} ---\n{text}"
            
            if full_text.strip():
                # Save individual text file
                txt_filename = pdf_file.replace('.pdf', '.txt')
                txt_path = os.path.join(output_dir, txt_filename)
                with open(txt_path, 'w', encoding='utf-8') as out:
                    out.write(full_text)
                print(f"  Extracted {len(full_text)} characters -> {txt_filename}")
                all_extracted[pdf_file] = full_text[:5000]  # First 5000 chars for summary
            else:
                print(f"  WARNING: No text extracted (might be scanned/image PDF)")
                all_extracted[pdf_file] = "[NO TEXT - SCANNED/IMAGE PDF]"
    except Exception as e:
        print(f"  ERROR: {e}")
        all_extracted[pdf_file] = f"[ERROR: {e}]"

# Print summary of what we got
print(f"\n\n{'='*60}")
print("EXTRACTION SUMMARY")
print(f"{'='*60}")
for pdf, content in all_extracted.items():
    if content.startswith("["):
        print(f"  ❌ {pdf}: {content}")
    else:
        print(f"  ✓ {pdf}: {len(content)} chars extracted (showing first 200):")
        print(f"    {content[:200]}...")
