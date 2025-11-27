// Thanksgiving 2025 Theme for Hideout
(function() {
  const theme = {
    name: "Thanksgiving 2025",
    colors: {
      background: "30 25% 12%",           // Deep warm brown
      foreground: "35 15% 92%",           // Warm off-white
      card: "25 30% 18%",                 // Rich brown card
      "card-foreground": "35 15% 92%",
      popover: "30 25% 12%",
      "popover-foreground": "35 15% 92%",
      primary: "35 85% 55%",              // Warm harvest orange
      "primary-foreground": "30 20% 10%",
      secondary: "25 25% 22%",            // Darker brown
      "secondary-foreground": "35 15% 92%",
      muted: "25 20% 22%",
      "muted-foreground": "35 12% 65%",
      accent: "15 75% 50%",               // Cranberry red
      "accent-foreground": "0 0% 100%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 0% 100%",
      border: "30 20% 25%",
      input: "30 20% 25%",
      ring: "35 85% 55%"
    },
    customEffects: {
      cleanup: function() {
        const existing = document.getElementById('thanksgiving-effects');
        if (existing) existing.remove();
      }
    }
  };
  
  // Apply colors
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
  
  // Apply custom effects
  if (theme.customEffects) {
    theme.customEffects.cleanup();
  }
  
  console.log(`Hideout theme loaded: ${theme.name}`);
})();
