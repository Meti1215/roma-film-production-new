from pathlib import Path

root = Path('src')
replacements = {
    '#C9A46A': '#0F2A4A',
    '#D2B48C': '#E63946',
    '#BE9C72': '#E63946',
    '#F8F4EF': '#F3F4F6',
    '#E7DED2': '#E5E7EB',
    '#222222': '#2B2B2B',
    '#b08e56': '#0F2A4A',
    'text-[#C9A46A]': 'text-[#0F2A4A]',
    'bg-[#C9A46A]': 'bg-[#0F2A4A]',
    'hover:bg-[#C9A46A]': 'hover:bg-[#0F2A4A]',
    'border-[#C9A46A]': 'border-[#0F2A4A]',
    'ring-[#C9A46A]': 'ring-[#0F2A4A]',
    'from-[#C9A46A]': 'from-[#0F2A4A]',
    'to-[#C9A46A]': 'to-[#0F2A4A]',
    'via-[#C9A46A]': 'via-[#0F2A4A]',
    'text-[#D2B48C]': 'text-[#E63946]',
    'bg-[#D2B48C]': 'bg-[#E63946]',
    'hover:bg-[#D2B48C]': 'hover:bg-[#E63946]',
    'border-[#D2B48C]': 'border-[#E63946]',
    'ring-[#D2B48C]': 'ring-[#E63946]',
    'from-[#D2B48C]': 'from-[#E63946]',
    'to-[#D2B48C]': 'to-[#E63946]',
    'via-[#D2B48C]': 'via-[#E63946]',
}

for path in root.rglob('*'):
    if path.is_file() and path.suffix.lower() in {'.ts', '.tsx', '.css', '.js', '.jsx'}:
        try:
            text = path.read_text(encoding='utf-8')
        except Exception:
            continue
        new_text = text
        for old, new in replacements.items():
            new_text = new_text.replace(old, new)
        if new_text != text:
            path.write_text(new_text, encoding='utf-8')
