import json
import os
from datetime import datetime

# Load the actual posts file
posts_file = "content/social-media/facebook/this_profile's_activity_across_facebook/posts/profile_posts_1.json"
print(f"Loading: {posts_file}")

with open(posts_file, 'r', encoding='utf-8') as f:
    posts_data = json.load(f)

print(f"Type: {type(posts_data)}")
if isinstance(posts_data, list):
    print(f"Count: {len(posts_data)}")
elif isinstance(posts_data, dict):
    print(f"Keys: {list(posts_data.keys())}")

# Show structure of first post
print("\n--- FIRST POST STRUCTURE ---")
if isinstance(posts_data, list):
    items = posts_data
else:
    items = posts_data.get('data', posts_data.get('posts', [posts_data]))

print(f"Total items: {len(items)}")
print(json.dumps(items[0], ensure_ascii=False, indent=2)[:3000])

# Extract all posts with text
print("\n\n--- ALL POSTS WITH TEXT (chronological) ---\n")
text_posts = []
for item in items:
    text = ""
    timestamp = item.get('timestamp', 0)
    
    # Facebook export format: data[].post or title
    if 'data' in item:
        for d in item['data']:
            if isinstance(d, dict) and 'post' in d:
                text = d['post']
    if not text and 'title' in item:
        text = item.get('title', '')
    
    # Also check attachments for descriptions
    attachments = item.get('attachments', [])
    attach_text = ""
    for att in attachments:
        if 'data' in att:
            for ad in att['data']:
                if 'text' in ad:
                    attach_text += ad['text'] + " "
                if 'description' in ad:
                    attach_text += ad.get('description', '') + " "
    
    if text or attach_text:
        date_str = datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d') if timestamp else "unknown"
        text_posts.append({
            'date': date_str,
            'timestamp': timestamp,
            'text': text,
            'attachment_text': attach_text.strip(),
            'title': item.get('title', '')
        })

# Sort by date
text_posts.sort(key=lambda x: x['timestamp'])
print(f"Total posts with content: {len(text_posts)}\n")

# Print all posts
for i, p in enumerate(text_posts):
    print(f"[{p['date']}] ", end="")
    if p['text']:
        print(p['text'][:300])
    elif p['title']:
        print(f"TITLE: {p['title'][:300]}")
    if p['attachment_text']:
        print(f"  ATTACH: {p['attachment_text'][:200]}")
    print()
