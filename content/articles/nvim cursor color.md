---
draft: false
date: 2025-03-30
tags:
  - nocturne
  - neovim
  - nvim
  - linux
  - MacOS
---
# [[nvim cursor color]]
Last few days i was fiddling around with my NeoVim setup, and i tried a few new plugins, and one of them was a brand new theme that i'm starting to like more and more. At a certain point I realized that my nvim cursor in normal mode colors went off, and the text wasn't really readable under the cursor, and that is something that can really drive me nuts.

## playing around with nvim cursor settings
First thing I thought was that the theme i'm using messed up the cursor, and i started looking for settings that would fix it, and came up with a few esoteric solutions that didn't translate well into lua, but I did manage to get the cursor right, even if the colors weren't exactly what I had in mind, but thats when I had the eureka moment - does the problem come from NeoVim to begin with?

## terminal settings 
Another change that I made lately is move from Kitty back to Ghostty as my main ternminal, and this was pretty much when the problems with the cursor started (i will write another post where i will address the whole Kitty to Ghostty move, and my whole theory and reasoning behind terminals).
In my first attempt at using Ghostty a few months ago I used a custom ghostty theme that was based on Catppuccin, and the second time around I Just used the built-in Catppuccin that ships whit Ghostty, and thats exactly where the problem was. I switched back to the custom theme, and there it was - cursor fg and bg colors exactly as I like them and want to have them! So I placed this in ~/.config/ghostty/themes/catppuccin-mocha-custom
```bash
palette = 0=#45475a
palette = 1=#f38ba8
palette = 2=#a6e3a1
palette = 3=#f9e2af
palette = 4=#89b4fa
palette = 5=#f5c2e7
palette = 6=#94e2d5
palette = 7=#bac2de
palette = 8=#585b70
palette = 9=#f38ba8
palette = 10=#a6e3a1
palette = 11=#f9e2af
palette = 12=#89b4fa
palette = 13=#f5c2e7
palette = 14=#94e2d5
palette = 15=#a6adc8
background = 1e1e2e
foreground = cdd6f4
cursor-color = f5e0dc
cursor-text = 1e1e2e
selection-background = 353749
selection-foreground = cdd6f4
```

All I had to do is tell Ghostty to use the custom theme somewhere in ~/.config/ghostty/config
```bash
theme = catppuccin-mocha-custom
```

As simple as that the cursor problem was solved!
