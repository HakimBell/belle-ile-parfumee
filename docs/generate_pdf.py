import markdown

# Read markdown file
with open('/Users/hakim/Desktop/CDA/belle-ile-parfumee/docs/script-presentation-cda.md', 'r', encoding='utf-8') as f:
    md_content = f.read()

# Convert markdown to HTML
md = markdown.Markdown(extensions=['tables', 'fenced_code'])
html_content = md.convert(md_content)

# Full HTML with styling
full_html = f'''
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Script de Présentation CDA - Belle Île Parfumée</title>
    <style>
        @media print {{
            body {{ font-size: 11pt; }}
            h1 {{ page-break-before: always; }}
            h1:first-of-type {{ page-break-before: avoid; }}
        }}

        body {{
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12pt;
            line-height: 1.6;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 40px;
        }}

        h1 {{
            color: #1a1d23;
            font-size: 28pt;
            border-bottom: 3px solid #ff6b6b;
            padding-bottom: 10px;
            margin-top: 40px;
        }}

        h2 {{
            color: #3f51b5;
            font-size: 18pt;
            margin-top: 30px;
            border-left: 4px solid #74c0fc;
            padding-left: 15px;
        }}

        h3 {{
            color: #6bd4a8;
            font-size: 14pt;
            margin-top: 25px;
        }}

        p {{
            margin: 12px 0;
            text-align: justify;
        }}

        blockquote {{
            background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
            border-left: 4px solid #ff6b6b;
            margin: 20px 0;
            padding: 20px 25px;
            font-style: normal;
            border-radius: 0 10px 10px 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }}

        blockquote p {{
            margin: 10px 0;
        }}

        strong {{
            color: #1a1d23;
        }}

        ul, ol {{
            margin: 12px 0 12px 25px;
        }}

        li {{
            margin: 6px 0;
        }}

        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 11pt;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }}

        th {{
            background: linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%);
            color: white;
            padding: 12px 15px;
            text-align: left;
        }}

        td {{
            border: 1px solid #e0e0e0;
            padding: 10px 15px;
        }}

        tr:nth-child(even) {{
            background: #f9f9f9;
        }}

        tr:hover {{
            background: #f0f4ff;
        }}

        code {{
            background: #f0f0f0;
            padding: 3px 8px;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            font-size: 11pt;
        }}

        hr {{
            border: none;
            border-top: 2px dashed #ddd;
            margin: 30px 0;
        }}

        em {{
            color: #666;
        }}

        .header {{
            text-align: center;
            padding: 40px 0;
            background: linear-gradient(135deg, #1a1d23 0%, #2d3748 100%);
            color: white;
            border-radius: 15px;
            margin-bottom: 40px;
        }}

        .header h1 {{
            color: white;
            border: none;
            margin: 0;
            font-size: 32pt;
        }}

        .header p {{
            color: #a0aec0;
            margin: 10px 0 0 0;
            font-size: 14pt;
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1>Script de Présentation CDA</h1>
        <p>Belle Île Parfumée - Application E-commerce</p>
    </div>
    {html_content}
</body>
</html>
'''

# Save HTML file
output_path = '/Users/hakim/Desktop/CDA/belle-ile-parfumee/docs/script-presentation-cda.html'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(full_html)

print("✅ HTML généré avec succès!")
print(f"📍 {output_path}")
print("📝 Pour créer le PDF : Ouvrir dans un navigateur → Imprimer → Enregistrer en PDF")
