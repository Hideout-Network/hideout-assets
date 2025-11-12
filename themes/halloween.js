// Halloween 2025 Theme for Hideout
(function() {
  const theme = {
    name: "Halloween 2025",
    colors: {
      background: "25 30% 8%",
      foreground: "25 10% 95%",
      card: "25 25% 12%",
      "card-foreground": "25 10% 95%",
      popover: "25 30% 8%",
      "popover-foreground": "25 10% 95%",
      primary: "30 95% 55%",
      "primary-foreground": "0 0% 0%",
      secondary: "25 20% 15%",
      "secondary-foreground": "25 10% 95%",
      muted: "25 20% 15%",
      "muted-foreground": "25 10% 65%",
      accent: "280 70% 50%",
      "accent-foreground": "0 0% 100%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 0% 100%",
      border: "25 25% 20%",
      input: "25 25% 20%",
      ring: "30 95% 55%"
    },
    customEffects: {
      cleanup: function() {
        const existing = document.getElementById('halloween-effects');
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
