---
draft: true
date: 2025-07-21
tags: []
---
# [[Macturne-installation-flow]]
1. check if brew is installed
	1. install brew
2. check if git is installed
	1. install git
3. check for XDG folders
	1. ~/.config
	2. ~/.local
4. clone repo
5. start nwizard TUI, configure optionals
	1. optionals:
		1. shell
		2. default browser
		3. terminal
		4. terminal font 
		5. terminal theme
6. start running installation scripts
	1. defaults
	2. software installation with brew
	3. configurations with stow 
		1. check if exists for backup
		2. back it up
		3. link new with stow
	4. optionals
7. reboot (or at least relog)

## software list
* atuin
* bat 
* eza
* fzf
* git
* gum
* lazydocker
* lazygit
* neofetch
* neovim
* ripgrep
* starship
* stow
* tldr
* thefuck
* yazi
* tmux
* tree-sitter
* zellij 
* zoxide

Casks
* ghostty
* kitty
* raycast
* aerospace
* alacritty
* nerd fonts
	* font-caskaydia-cove-nerd-font
	* font-ubuntu-nerd-font
	* font-jetbrains-mono-nerd-font
	* font-noto-nerd-font
	
