import pdfplumber
import os

reports_dir = "content/annual-reports"
output_dir = "content/annual-reports/extracted-v2"
os.makedirs(output_dir, exist_ok=True)

pdf_files = [f for f in os.listdir(reports_dir) if f.endswith('.pdf')]
print(f"Found {len(pdf_files)} PDF files\n")

for pdf_file in sorted(pdf_files):
    filepath = os.path.join(reports_dir, pdf_file)
    print(f"{'='*70}")
    print(f"Processing: {pdf_file}")
    print(f"{'='*70}")
    
    try:
        with pdfplumber.open(filepath) as pdf:
            num_pages = len(pdf.pages)
            print(f"  Pages: {num_pages}")
            
            full_text = ""
            for i, page in enumerate(pdf.pages):
                text = page.extract_text()
                if text:
                    full_text += f"\n\n=== PAGE {i+1} ===\n{text}"
                    
                # Also try extracting tables
                tables = page.extract_tables()
                if tables:
                    for t_idx, table in enumerate(tables):
                        full_text += f"\n[TABLE on page {i+1}]\n"
                        for row in table:
                            full_text += " | ".join([str(cell) if cell else "" for cell in row]) + "\n"
            
            if full_text.strip():
                txt_filename = pdf_file.replace('.pdf', '_v2.txt')
                txt_path = os.path.join(output_dir, txt_filename)
                with open(txt_path, 'w', encoding='utf-8') as out:
                    out.write(full_text)
                print(f"  Extracted {len(full_text)} characters -> {txt_filename}")
            else:
                print(f"  WARNING: No text extracted")
    except Exception as e:
        print(f"  ERROR: {e}")

print("\nDone! All files saved to content/annual-reports/extracted-v2/")
