# Hideout Themes System

## Overview
Hideout now supports custom themes! Themes are JavaScript files that dynamically modify the color scheme of the entire site.

## Using Themes

### Available Themes
1. **Default Dark** - The classic Hideout green theme
2. **Halloween** - Spooky orange and purple theme

### How to Apply a Theme

To apply a theme, load the theme JavaScript file in your HTML or dynamically inject it:

```html
<script src="https://your-cdn.com/themes/default.js"></script>
```

Or dynamically:
```javascript
const script = document.createElement('script');
script.src = 'https://your-cdn.com/themes/halloween.js';
document.head.appendChild(script);
```

## Creating Your Own Theme

### Step 1: Copy the Base Theme
Start with `public/themes/default.js` as your template.

### Step 2: Modify Colors
Edit the `theme.colors` object with your custom HSL colors:

```javascript
const theme = {
  name: "My Custom Theme",
  version: "1.0.0",
  author: "Your Name",
  
  colors: {
    background: "220 30% 10%",    // Dark blue
    foreground: "220 10% 95%",    // Light text
    primary: "220 80% 50%",        // Blue accent
    // ... more colors
  }
};
```

### Step 3: Host Your Theme
Upload your theme file to a publicly accessible URL (GitHub Pages, Vercel, CDN, etc.)

### Step 4: Add to themes.json
Add your theme to `src/data/themes.json`:

```json
{
  "id": "my-theme",
  "name": "My Custom Theme",
  "description": "A cool blue theme",
  "author": "Your Name",
  "version": "1.0.0",
  "themeUrl": "https://your-cdn.com/my-theme.js"
}
```

## Color Variables Reference

All colors use HSL format: `"hue saturation% lightness%"`

### Essential Colors
- `background` - Main page background
- `foreground` - Main text color
- `primary` - Primary accent (buttons, links)
- `card` - Card/panel backgrounds

### Interactive Elements
- `border` - Border colors
- `input` - Input field borders
- `ring` - Focus ring color

### Navigation
- `navBackground` - Nav bar background
- `navItemActive` - Active nav item

## Example Themes

### Dark Blue Theme
```javascript
colors: {
  background: "220 30% 10%",
  primary: "220 80% 50%",
  // ...
}
```

### Sunset Theme
```javascript
colors: {
  background: "15 30% 10%",
  primary: "25 95% 53%",
  accent: "340 75% 55%",
  // ...
}
```

### Forest Theme
```javascript
colors: {
  background: "150 20% 8%",
  primary: "150 70% 40%",
  accent: "120 60% 45%",
  // ...
}
```

## Testing Your Theme

1. Load the theme in your local development environment
2. Check all pages (Games, Apps, Browser, etc.)
3. Test interactive elements (buttons, inputs, dropdowns)
4. Verify text contrast for readability
5. Test both light and dark mode if applicable

## Best Practices

✅ **DO:**
- Ensure good contrast between text and backgrounds
- Test all interactive states (hover, active, focus)
- Keep saturation levels reasonable (30-80%)
- Use consistent color families

❌ **DON'T:**
- Use colors with poor contrast (white on light gray)
- Make extremely saturated backgrounds (causes eye strain)
- Use pure black/white unless intentional
- Forget to test on different screen sizes

## Advanced: Dynamic Theme Switching

To allow users to switch themes dynamically:

```javascript
function loadTheme(themeUrl) {
  // Remove old theme
  const oldScript = document.getElementById('hideout-theme');
  if (oldScript) oldScript.remove();
  
  // Load new theme
  const script = document.createElement('script');
  script.id = 'hideout-theme';
  script.src = themeUrl;
  document.head.appendChild(script);
}

// Example usage
loadTheme('https://your-cdn.com/themes/halloween.js');
```

## Support

For help creating themes or reporting issues:
- Check the `public/themes/README.md` for detailed color documentation
- Review example themes in `public/themes/`
- Email: hideout-network-buisness@hotmail.com
