import json
import os
from datetime import datetime

# Load posts
posts_file = r"content/social-media/facebook/this_profile's_activity_across_facebook/posts/profile_posts_1.json"

with open(posts_file, 'r', encoding='utf-8') as f:
    raw = f.read()

# Facebook exports use latin-1 encoded UTF-8 - need to fix
# The text is double-encoded: UTF-8 bytes stored as latin-1
def fix_encoding(text):
    try:
        return text.encode('latin-1').decode('utf-8')
    except (UnicodeDecodeError, UnicodeEncodeError):
        return text

posts_data = json.loads(raw)
print(f"Total posts: {len(posts_data)}")

# Also load events
events_file = r"content/social-media/facebook/this_profile's_activity_across_facebook/events/events.json"
events_hosted_file = r"content/social-media/facebook/this_profile's_activity_across_facebook/events/events_you_hosted.json"

events = []
for ef in [events_file, events_hosted_file]:
    if os.path.exists(ef):
        with open(ef, 'r', encoding='utf-8') as f:
            ev_data = json.load(f)
        if isinstance(ev_data, list):
            events.extend(ev_data)
        elif isinstance(ev_data, dict) and 'events_joined_v2' in ev_data:
            events.extend(ev_data['events_joined_v2'])
        elif isinstance(ev_data, dict) and 'events_hosted_v2' in ev_data:
            events.extend(ev_data['events_hosted_v2'])
        print(f"Loaded events from {ef}: {len(ev_data) if isinstance(ev_data, list) else 'dict'}")

# Also load profile info
profile_file = r"content/social-media/facebook/profile_information/profile_information/profile_information.json"
if os.path.exists(profile_file):
    with open(profile_file, 'r', encoding='utf-8') as f:
        profile = json.load(f)
    print("\n--- PROFILE INFORMATION ---")
    print(json.dumps(profile, ensure_ascii=False, indent=2)[:5000])

# Extract and fix all posts
print("\n\n--- ALL POSTS (chronological, encoding fixed) ---\n")
all_posts = []
for item in posts_data:
    timestamp = item.get('timestamp', 0)
    date_str = datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M') if timestamp else "unknown"
    
    # Get post text
    text = ""
    if 'data' in item:
        for d in item['data']:
            if isinstance(d, dict) and 'post' in d:
                text = fix_encoding(d['post'])
    
    title = fix_encoding(item.get('title', ''))
    
    # Get event info
    event_info = ""
    attachments = item.get('attachments', [])
    for att in attachments:
        if 'data' in att:
            for ad in att['data']:
                if 'event' in ad:
                    ev = ad['event']
                    event_info = f"EVENT: {fix_encoding(ev.get('name', ''))} | {fix_encoding(ev.get('description', '')[:500])}"
                if 'text' in ad:
                    if not text:
                        text = fix_encoding(ad['text'])
    
    if text or event_info:
        all_posts.append({
            'date': date_str,
            'ts': timestamp,
            'text': text,
            'title': title,
            'event': event_info
        })

all_posts.sort(key=lambda x: x['ts'])
print(f"Posts with content: {len(all_posts)}\n")

for p in all_posts:
    print(f"[{p['date']}]")
    if p['title'] and p['title'] != p['text']:
        print(f"  TITLE: {p['title'][:200]}")
    if p['text']:
        # Print full text for content extraction
        print(f"  {p['text'][:500]}")
    if p['event']:
        print(f"  {p['event'][:400]}")
    print()
