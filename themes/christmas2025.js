// Christmas Theme for Hideout
(function() {
  const theme = {
    name: "Christmas",
    colors: {
      background: "140 25% 8%",
      foreground: "0 0% 98%",
      card: "140 20% 12%",
      "card-foreground": "0 0% 98%",
      popover: "140 25% 8%",
      "popover-foreground": "0 0% 98%",
      primary: "355 85% 55%",
      "primary-foreground": "0 0% 100%",
      secondary: "140 30% 20%",
      "secondary-foreground": "0 0% 98%",
      muted: "140 20% 15%",
      "muted-foreground": "0 0% 70%",
      accent: "140 60% 45%",
      "accent-foreground": "0 0% 100%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 0% 100%",
      border: "140 25% 22%",
      input: "140 25% 22%",
      ring: "355 85% 55%"
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
