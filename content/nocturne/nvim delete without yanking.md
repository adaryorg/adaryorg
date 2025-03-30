---
draft: false
date: 26-03-2025
tags:
  - nocturne
  - nvim
  - MacOS
  - neovim
  - linux
---
# [[ nvim delete without yanking]]
I cant even count how many times i wanted to paste something into nvim, but before pasting i had to delete a few lines, and then my clipboard gets replaced by what i deleted and then i have to copy/yank the same text again to paste into nvim ...

The solution to this can be as easy as a few remaps of some nvim defaults.

First of all, I want to remap d, D and x to yank into the black hole register instead of the default:
```nvim
-- delete without yanking
vim.keymap.set("n", "d", '"_d', opts)
vim.keymap.set("v", "d", '"_d', opts)
vim.keymap.set("n", "x", '"_x', opts)
vim.keymap.set("n", "D", '"_D', opts)
```
Second, i want to create mappings which will replicate the default behavior, but will be slightly different:
```nvim
-- delete with leader to yank
vim.keymap.set("n", "<leader>d", '""d')
vim.keymap.set("n", "<leader>x", '""x')
vim.keymap.set("n", "<leader>D", '""D')
vim.keymap.set("v", "<leader>d", '""d')
```
And that's it. Restart nvim, and now d, x and D will just delete text, and if you prefix them with your leader (space in my case) they will retain the default behavior.
