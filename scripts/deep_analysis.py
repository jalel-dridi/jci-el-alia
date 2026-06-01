import json
import os
from collections import Counter, defaultdict

# Part 1: Deep Facebook posts analysis
print("="*80)
print("PART 1: DEEP FACEBOOK POSTS ANALYSIS")
print("="*80)

fb_dir = "content/social-media/facebook"
# Find the posts JSON file
json_files = []
for root, dirs, files in os.walk(fb_dir):
    for f in files:
        if f.endswith('.json'):
            json_files.append(os.path.join(root, f))

print(f"\nFound {len(json_files)} JSON files:")
for jf in json_files[:20]:
    print(f"  {jf}")

# Load and analyze posts
all_posts = []
for jf in json_files:
    try:
        with open(jf, 'r', encoding='utf-8') as f:
            data = json.load(f)
        if isinstance(data, list):
            all_posts.extend(data)
        elif isinstance(data, dict):
            # Facebook export format varies
            if 'data' in data:
                all_posts.extend(data['data'])
            else:
                all_posts.append(data)
    except Exception as e:
        print(f"  Error reading {jf}: {e}")

print(f"\nTotal posts/items loaded: {len(all_posts)}")

# Analyze post structure
if all_posts:
    sample = all_posts[0]
    print(f"\nSample post keys: {list(sample.keys()) if isinstance(sample, dict) else type(sample)}")
    
    # Extract all post texts
    post_texts = []
    post_dates = []
    for post in all_posts:
        if isinstance(post, dict):
            # Try different Facebook export formats
            text = ""
            if 'data' in post:
                for item in post.get('data', []):
                    if isinstance(item, dict) and 'post' in item:
                        text = item['post']
            if 'post' in post:
                text = post['post']
            if not text and 'title' in post:
                text = post.get('title', '')
            if not text and 'description' in post:
                text = post.get('description', '')
                
            timestamp = post.get('timestamp', 0)
            
            if text:
                post_texts.append(text)
                post_dates.append(timestamp)
    
    print(f"Posts with text content: {len(post_texts)}")
    
    # Print first 10 posts to understand format
    print("\n--- FIRST 5 POSTS (full structure) ---")
    for i, post in enumerate(all_posts[:5]):
        print(f"\nPost {i+1}:")
        print(json.dumps(post, ensure_ascii=False, indent=2)[:1500])
        print("...")

print("\n\n")
print("="*80)
print("PART 2: KEY SECTIONS FROM IMPROVED PDF EXTRACTIONS")
print("="*80)

v2_dir = "content/annual-reports/extracted-v2"
for f in sorted(os.listdir(v2_dir)):
    filepath = os.path.join(v2_dir, f)
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    print(f"\n{'#'*70}")
    print(f"# {f} ({len(content)} chars)")
    print(f"{'#'*70}")
    
    # Print pages 1-10 which have bureau, stats, key info
    pages = content.split("=== PAGE")
    for page in pages[1:12]:  # First 11 pages
        print(f"\n--- PAGE{page[:2000]}")
