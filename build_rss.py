#!/usr/bin/env python3
"""
LOC Cyber Mobile World Special Program - RSS Feed Generator
Generates a compliant, enriched RSS 2.0 / iTunes / Atom XML feed including:
- Live Spotify episode integration and custom link references
- Official podcast artwork reference (podcast_cover.png)
- Audio enclosure preview stream
- Complete 10-part classified forensic dossier corpus
"""

import os
import datetime
import xml.sax.saxutils as saxutils

BASE_URL = "https://rajkot.github.io/LOC-Cyber-Mobile-World-Special-Program-15-09-2026"
OFFICIAL_RSS_URL = "https://anchor.fm/s/1170c4654/podcast/rss"
APPLE_PODCASTS_URL = "https://podcasts.apple.com/us/podcast/inside-billion-dollar-cyber-fraud-machine-digital-arrests-simboxes-international-scam-networks/id6810244376"
SPOTIFY_SHOW_URL = "https://open.spotify.com/show/5vPqZ9eLkZc0duBO1nFfDZ"
SPOTIFY_EPISODE_URL = "https://open.spotify.com/episode/0gX4B6IDX6kgr1Ya9FU2Po?si=UtbrX5_YTRKQ3jKk0MN7xA"
SPOTIFY_EMBED_URL = "https://open.spotify.com/embed/episode/0gX4B6IDX6kgr1Ya9FU2Po?utm_source=generator"
AUDIO_PREVIEW_URL = "https://p.scdn.co/mp3-preview/d275e91615700d710aa2b00cb400b26627979dad.mp3"
COVER_IMAGE_URL = f"{BASE_URL}/podcast_cover.png"

REPORT_METADATA = [
    {
        "part": 1,
        "page_id": "page-01",
        "title": "Part 1: Recorded Context & Transnational Syndicate Architecture",
        "desc": "Foundational intelligence analysis detailing cross-border cyber syndicate hierarchies, call center boiler rooms, and Southeast Asian forced-labor cyber compounds."
    },
    {
        "part": 2,
        "page_id": "page-02",
        "title": "Part 2: Deep Dive into Illegal SIMBox Telecommunication Hardware",
        "desc": "Technical hardware dissection of GSM SIMBoxes, VoIP gateway routing, IMSI spoofing, and rogue cellular relay operations across international borders."
    },
    {
        "part": 3,
        "page_id": "page-03",
        "title": "Part 3: Digital Arrests, Coercion Psychology & Judicial Impersonation",
        "desc": "Exhaustive breakdown of digital arrest psychological vectors, Skype/WhatsApp interrogation staging, fabricated warrants, and victim compliance coercion."
    },
    {
        "part": 4,
        "page_id": "page-04",
        "title": "Part 4: Financial Layering, Mule Accounts & Crypto Laundering",
        "desc": "Investigation of multi-layered banking mule networks, instant UPI skimming, OTC cryptocurrency converters, and illicit cross-border fiat flight."
    },
    {
        "part": 5,
        "page_id": "page-05",
        "title": "Part 5: The Emergence of Generative AI, Deepfake Audio & Voice Cloning",
        "desc": "Forensic examination of 3-second voice cloning exploits, real-time video deepfakes, automated social engineering bots, and AI phishing payloads."
    },
    {
        "part": 6,
        "page_id": "page-06",
        "title": "Part 6: National Regulatory Frameworks, DoT Directives & Telecom Sanctions",
        "desc": "Regulatory and legal enforcement apparatus analysis, Department of Telecommunications blocking directives, KYC audits, and IMEI blacklisting."
    },
    {
        "part": 7,
        "page_id": "page-07",
        "title": "Part 7: 1930 Helpline Golden Hour Protocol & Real-Time Fund Freezing",
        "desc": "Operational mechanics of the Citizen Financial Cyber Fraud Reporting System (CFCFRMS), 1930 National Helpline response, and bank nodal API integrations."
    },
    {
        "part": 8,
        "page_id": "page-08",
        "title": "Part 8: Institutional Cybersecurity Posture, Corporate & SME Defense",
        "desc": "Enterprise cyber posture, Business Email Compromise (BEC) prevention, zero-trust endpoint containment, and employee cyber hygiene drills."
    },
    {
        "part": 9,
        "page_id": "page-09",
        "title": "Part 9: International Law Enforcement Alliances & Extradition Jurisprudence",
        "desc": "INTERPOL Red Notices, bilateral mutual legal assistance treaties (MLATs), sovereign jurisdictional challenges, and cross-border takedown coordination."
    },
    {
        "part": 10,
        "page_id": "page-10",
        "title": "Part 10: Master Forensic Synthesis & Decade Outlook Action Matrix",
        "desc": "Grand strategic synthesis, unified cybersecurity doctrine, timeline projections through 2030, and actionable national security mitigation blueprints."
    }
]


def escape(text: str) -> str:
    """Escapes XML entities safely."""
    return saxutils.escape(text, {'"': '&quot;', "'": '&apos;'})


def build_rss_xml() -> str:
    """Constructs the complete, rich RSS feed."""
    now = datetime.datetime.now(datetime.timezone.utc)
    pub_date = "Wed, 09 Sep 2026 09:37:00 +0000"
    build_date = now.strftime("%a, %d %b %Y %H:%M:%S +0000")

    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0"',
        '     xmlns:content="http://purl.org/rss/1.0/modules/content/"',
        '     xmlns:dc="http://purl.org/dc/elements/1.1/"',
        '     xmlns:atom="http://www.w3.org/2005/Atom"',
        '     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"',
        '     xmlns:podcast="https://podcastindex.org/namespace/1.0">',
        '  <channel>',
        '    <title>LOC Cyber Mobile World Special Program | Spotify Podcast &amp; Intelligence Dossier</title>',
        f'    <link>{BASE_URL}/</link>',
        f'    <description>Inside the Billion-Dollar Cyber Fraud Machine: Digital Arrests, Simboxes &amp; International Scam Networks. Definitive intelligence briefing and classified forensic dossier on transnational telecom exploits and law enforcement countermeasures. Listen directly on Spotify: {SPOTIFY_EPISODE_URL}</description>',
        '    <language>en-us</language>',
        '    <copyright>LOC Cyber Security Program 2026</copyright>',
        '    <managingEditor>command@loc-cyber.org (LOC Cyber Command)</managingEditor>',
        '    <webMaster>admin@loc-cyber.org (LOC Command Webmaster)</webMaster>',
        f'    <pubDate>{pub_date}</pubDate>',
        f'    <lastBuildDate>{build_date}</lastBuildDate>',
        '    <category>Technology / Information Security</category>',
        '    <generator>LOC Cyber RSS Generator v2.4 (Python)</generator>',
        '    <docs>https://www.rssboard.org/rss-specification</docs>',
        f'    <atom:link href="{BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />',
        f'    <atom:link href="{OFFICIAL_RSS_URL}" rel="alternate" type="application/rss+xml" title="Official Anchor Podcast RSS Feed" />',
        f'    <atom:link href="{APPLE_PODCASTS_URL}" rel="related" type="text/html" title="Listen on Apple Podcasts" />',
        f'    <atom:link href="{SPOTIFY_SHOW_URL}" rel="related" type="text/html" title="Official Spotify Podcast Show" />',
        f'    <atom:link href="{SPOTIFY_EPISODE_URL}" rel="related" type="text/html" title="Listen to Featured Episode on Spotify" />',
        '    <image>',
        f'      <url>{COVER_IMAGE_URL}</url>',
        '      <title>LOC Cyber Mobile World Special Program</title>',
        f'      <link>{BASE_URL}/</link>',
        '      <width>144</width>',
        '      <height>144</height>',
        '    </image>',
        f'    <itunes:image href="{COVER_IMAGE_URL}" />',
        '    <itunes:subtitle>Inside the Billion-Dollar Cyber Fraud Machine</itunes:subtitle>',
        '    <itunes:author>LOC Cyber Command &amp; Delhi Police IFSO</itunes:author>',
        '    <itunes:summary>Inside the Billion-Dollar Cyber Fraud Machine: Digital Arrests, Simboxes &amp; International Scam Networks | LOC Cyber Mobile World Program: Mule Accounts &amp; 1930 Golden Hour</itunes:summary>',
        '    <itunes:category text="Technology">',
        '      <itunes:category text="Information Security" />',
        '    </itunes:category>',
        '    <itunes:explicit>false</itunes:explicit>',
        ''
    ]

    # Item 1: The Official Spotify Podcast Episode
    episode_desc = (
        "Inside the Billion-Dollar Cyber Fraud Machine: Digital Arrests, Simboxes &amp; International Scam Networks.\n\n"
        "Featured Experts: Joint CP Rajnish Gupta (Delhi Police IFSO) and Forensics Specialist Amit Dubey.\n"
        "Key Operational Topics: SIMBox telecommunication fraud, illegal GSM gateways, mule banking rings, "
        "forced-labor cyber scam compounds, and the critical 1930 National Cyber Helpline Golden Hour protocol.\n\n"
        f"🎧 Stream Full Episode on Spotify: {SPOTIFY_EPISODE_URL}\n"
        f"🌐 Access Dossier &amp; Interactive Portal: {BASE_URL}/"
    )

    xml_lines.extend([
        '    <!-- ==================================================================== -->',
        '    <!-- FEATURED ITEM: OFFICIAL SPOTIFY EPISODE 3100                         -->',
        '    <!-- ==================================================================== -->',
        '    <item>',
        '      <title>Episode 3100: Inside the Billion-Dollar Cyber Fraud Machine (Digital Arrests, Simboxes &amp; International Scam Networks)</title>',
        f'      <link>{SPOTIFY_EPISODE_URL}</link>',
        f'      <guid isPermaLink="false">loc-spotify-ep-0gX4B6IDX6kgr1Ya9FU2Po</guid>',
        f'      <pubDate>{pub_date}</pubDate>',
        f'      <description>{escape(episode_desc)}</description>',
        '      <content:encoded><![CDATA[',
        '        <p><strong>LOC Cyber Mobile World Special Program - Episode 3100</strong></p>',
        '        <p>Inside the Billion-Dollar Cyber Fraud Machine: Digital Arrests, Simboxes & International Scam Networks.</p>',
        f'        <p><a href="{SPOTIFY_EPISODE_URL}" target="_blank" rel="noopener noreferrer"><strong>▶ Listen directly on Spotify</strong></a></p>',
        f'        <p><iframe style="border-radius:12px" src="{SPOTIFY_EMBED_URL}" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></p>',
        f'        <p>Visit the full classified intelligence dossier: <a href="{BASE_URL}/">{BASE_URL}/</a></p>',
        '      ]]></content:encoded>',
        f'      <enclosure url="{AUDIO_PREVIEW_URL}" length="3145728" type="audio/mpeg" />',
        '      <itunes:duration>11997</itunes:duration>',
        '      <itunes:episode>3100</itunes:episode>',
        '      <itunes:episodeType>full</itunes:episodeType>',
        '      <itunes:author>Joint CP Rajnish Gupta &amp; Amit Dubey</itunes:author>',
        '      <dc:creator>LOC Cyber Command</dc:creator>',
        f'      <atom:link href="{SPOTIFY_EPISODE_URL}" rel="alternate" type="text/html" title="Spotify Audio Stream" />',
        '    </item>',
        ''
    ])

    # Items 2-11: The 10 Classified Forensic Dossier Volumes
    for item in REPORT_METADATA:
        part_num = item["part"]
        page_id = item["page_id"]
        title = item["title"]
        desc = item["desc"]
        dossier_url = f"{BASE_URL}/#{page_id}"

        item_desc = (
            f"{desc}\n\n"
            f"Official companion report to LOC Cyber Mobile World Special Program Episode 3100.\n"
            f"🎧 Listen to the podcast on Spotify: {SPOTIFY_EPISODE_URL}\n"
            f"📖 Read Classified Report Online: {dossier_url}"
        )

        xml_lines.extend([
            '    <item>',
            f'      <title>Forensic Dossier: {escape(title)}</title>',
            f'      <link>{dossier_url}</link>',
            f'      <guid isPermaLink="false">loc-dossier-part-{part_num}</guid>',
            f'      <pubDate>{pub_date}</pubDate>',
            f'      <description>{escape(item_desc)}</description>',
            '      <content:encoded><![CDATA[',
            f'        <h3>Forensic Research Report: Part {part_num}</h3>',
            f'        <p>{desc}</p>',
            f'        <p><strong>Listen to the official audio discussion:</strong> <a href="{SPOTIFY_EPISODE_URL}" target="_blank" rel="noopener noreferrer">Spotify Podcast Episode 3100</a></p>',
            f'        <p><a href="{dossier_url}">Access Full Research Report on LOC Command Portal &rarr;</a></p>',
            '      ]]></content:encoded>',
            '      <dc:creator>LOC Cyber Command</dc:creator>',
            f'      <atom:link href="{SPOTIFY_EPISODE_URL}" rel="related" type="text/html" title="Listen to Episode on Spotify" />',
            '    </item>',
            ''
        ])

    xml_lines.extend([
        '  </channel>',
        '</rss>'
    ])

    return '\n'.join(xml_lines)


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, "rss.xml")

    print(f"[*] Generating RSS feed at: {output_path}...")
    rss_content = build_rss_xml()

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(rss_content)

    print(f"[+] Successfully wrote {len(rss_content)} bytes to {output_path}")
    print(f"[+] Included Spotify Link: {SPOTIFY_EPISODE_URL}")
    print(f"[+] Included Cover Artwork: {COVER_IMAGE_URL}")
    print(f"[+] Included 10 Classified Forensic Dossier Parts.")


if __name__ == "__main__":
    main()
