import os

extracted_dir = "content/annual-reports/extracted"
files = sorted(os.listdir(extracted_dir))

for f in files:
    filepath = os.path.join(extracted_dir, f)
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    print(f"\n{'#'*80}")
    print(f"# {f}")
    print(f"# Length: {len(content)} chars")
    print(f"{'#'*80}")
    # Print first 3000 chars which usually contains bureau, sommaire, key info
    print(content[:3000])
    print("\n[... truncated ...]")
