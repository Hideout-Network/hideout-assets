// Sunset Theme for Hideout
(function() {
  const theme = {
    name: "Sunset",
    colors: {
      background: "15 30% 10%",
      foreground: "15 10% 95%",
      card: "15 25% 14%",
      "card-foreground": "15 10% 95%",
      popover: "15 30% 10%",
      "popover-foreground": "15 10% 95%",
      primary: "25 95% 53%",
      "primary-foreground": "0 0% 100%",
      secondary: "15 20% 18%",
      "secondary-foreground": "15 10% 95%",
      muted: "15 20% 18%",
      "muted-foreground": "15 10% 65%",
      accent: "340 75% 55%",
      "accent-foreground": "0 0% 100%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 0% 100%",
      border: "15 25% 22%",
      input: "15 25% 22%",
      ring: "25 95% 53%"
    },
    customEffects: null
  };

  // Apply colors
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });

  console.log(`Hideout theme loaded: ${theme.name}`);
})();
