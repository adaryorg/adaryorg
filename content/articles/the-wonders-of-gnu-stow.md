---
draft: false
date: 2025-04-28
tags:
  - article
  - linux
  - MacOS
  - nocturne
title: The wonders of GNU stow
---
# [[the-wonders-of-gnu-stow]]
## work environments and their woes
When ever I get behind a new computer or a workstation, I need to start being productive as soon as possible, and to be perfectly honest, I can start being productive straight away. I probably need one or two tools that are most likely already present, and if not they can be easily installed using the locally available package management tool, and off I go, i can start working.<br>
The issue is that I want to have my work environment as similar to all other work environments that I use, and I really do want to a visually pleasing work environment that I enjoy using. I also like to have all shortcuts configured just the wway I like them, I want to have all the tools that i'm used to, I want to have all visual themes configured the way I like them, and setting something like that up from scratch would take days if not weeks, and not to mention it would be very difficult to replicate from memory, and there would always be those small discrepancies that would drive me to make even more changes instead of focusing on what I should be focusing and that is work.

## enter dotfile management
The above is the main reason that I maintain my 'dotfiles' in a git repo, and I can have them readily available on every new environment that I start using. Clone a repo, and Bob's your uncle. Configurations are all there, tools can read them easily, I can run a small shell script to configure everything to my liking, and this is where things start getting complicated and easily messed up if proper attention is not paid to all aspects of the environment.<br>
First of all, I work on both Linux and MacOS, and there are some differences between those two systems. Not all the tools are the same, there are some tools that exist on Mac, some that exist on Linux, and even if we start analyzing linux only, there are so many flavors out there that it might be hard to unify all of them under one umbrella.<br>
Some things can be unified easily though. I keep all my dotfiles in one place and this would usually be the very first thing I do on a new system:
```bash
cd $HOME; git clone https://github.org/adaryorg/dotfiles .dotfiles
```
Clone my dotfiles repo into a hidden folder in the root of my home directory. Why a hidden folder? I like to keep a home directory as clean as possible and placing all configs in a hidden folder just feels like a natural thing to do.<br>
The way to properly configure the dotfiles repo for gnu stow is to have a folder for each tool that is managed, and inside that folder the directory structure that we would expect to see under $HOME:
```bash
tree -a -L 3
...
├── nvim
│   └── .config
│       └── nvim
├── starship
│   └── .config
│       └── starship.toml
├── testapp1
│   └── .config
│       └── testapp1
├── tmux
│   ├── .tmux
│   │   ├── custom_modules
│   │   └── plugins
│   └── .tmux.conf
├── yazi
│   └── .config
│       └── yazi
└── zsh
    ├── .config
    │   └── zshrc
    └── .zshrc
...
```
This is the directory structure that stow likes working with. 
Second step is to simply cd to the dotfiles folder, and run stow:
```bash
cd $HOME/.dotfiles; stow zsh
```
Providing that the files $HOME/.zshrc and $HOME/.config/zshrc don't exist, stow will create symbolic links in those two locations, poniting to the files in $HOME/.dotfiles folder and we get our instant configuration for zsh.
If the files exist, stow will not do anything, and another thing I noticed about stow is that it really don't like linking to folders that are not directly under $HOME. I have no idea why this is since it never reports any errors, or whether this is a Mac thing only but it is what it is, and in any case I keep my dotfiles folder under $HOME so no real issues there for me.