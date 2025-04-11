---
draft: false
date: 2025-04-11
tags:
  - article
  - linux
  - MacOS
  - nocturne
title: Creating a generic zsh configuration for multiple operating systems
---
# [[creating-generic-zshrc-for-multiple-os]]

## One zshrc to rule them all
In my line of work i have to switch different environments quite often, and start working on brand new systems that were never configured by anyone, and are far from the cozy well-defined and well-configured environment that I like to use. The tools that I like to have installed are probably one dnf/yum/apt/pacman/yay/emerge/whatever command away, and their configuration is probably somewhere in my dotfiles git repo, but is there a way to have a 'one size fits all' zsh configuration?<br>
This is where zsh can start shining with its custom functions that can be defined to make our life easier.<br>
## lets get into those zsh nitty gritty details

This is the very beginning of my .zshrc:

```zsh
[[ -d "$HOME/.config/zshrc" ]] && fpath=($HOME/.config/zshrc $fpath) || echo "zshrc config not found!"

autoload zsh_src zsh_eval
```

The idea behind these two custom functions is to first check if the tool exists, execute the eval or source if it does, and completely ignore it if it doesn't. So the script first checks if the path with custom functions exists, and if it does it adds it to $fpath. From there we let zsh autoload the two custom functions, and here is what they look like and what they do:

$HOME/.config/zshrc/zsh_eval:
```zsh 
zsh_eval () {
  if [[ -f "$(which $1)" ]]; then
    eval "$($*)"
  fi
}
```

$HOME/.config/zshrc/zsh_src:
```zsh
zsh_src() {
  if [[ -f $1 ]]; then
    source $1
  fi
}
```

## platform agnostic zsh setup
From here on we can proceed configuring the rest of our zsh environment using the two new functions:

```zsh
zsh_src $ZSH/oh-my-zsh.sh

zsh_eval /opt/homebrew/bin/brew shellenv
zsh_eval starship init zsh
zsh_eval zoxide init zsh
zsh_eval atuin init zsh
```

This block will try to initialize oh-my-zsh, homebrew, starship, zoxine and atuin, buf if the tools are not present in the environment it will just proceed without reporting any errors, which is the desired outcome. This can be used for pretty much any tool that needs to set itself up in the shell environment, and to source any helper that might exist for a particular environment.<br>
My use-case relies on zsh_src where in the work environment I would source a helper alias file with various ssh aliases, and in the home environment that file is not present, and the zshrc will just skip it and move on.

Same applies for different environments between work laptop (MacOS) and home desktop (Some flavor of Linux) where in the work environment I would have homebrew (as shown in the example) and in the home environment I don't need it.

## even more automation
As long as my .zshrc and .config/zshrc live in a git repo, I can easily clone it to a new environment and use gnu stow to set the environment up in a few seconds. More on that in the next article!