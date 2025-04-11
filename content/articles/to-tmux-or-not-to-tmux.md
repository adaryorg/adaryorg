---
draft: false
date: 2025-03-31
tags:
  - tmux
  - linux
  - MacOS
  - terminal
title: To tmux or not to tmux?
---
# [[to-tmux-or-not-to-tmux]]
In the past few months my youtube feed is pretty much filled with tech, programming and linux influencers. Most of them talk about tiling window managers, working on arch linux, working with neovim, and using tmux (or that other terminal multiplexer) for pretty much every task. They will go to great lenghts to show off their tmux configurations, how amazingly it integrates with their work environment, how they can seamlessly open new panes, split the existing panes, easily switch between everything with keyboard, and be super ultra productive, probably way more than us mere mortals.

## insert Ryan Raynlods but why meme here      
This is where I really have to ask: but why? What to they insist to add yet another layer of complexity in their terminal, one that can easily mess up with the terminal settings, change colors in unexpected ways, and completely mess your work up if you work in certain scenarios?<br> Let's face the facts: if a tool exists, and does certain things, it doesn't mean that you have to use it, especially since there are other tools (or features) that will achieve pretty much the same.

## let me backtrack a little
Here is my usecase. I love splitting panes in my terminal. I also like to be able to zoom a pane in and out, i like to have multople tabs in my terminals, and i like to be able to use the keyboard to switch between tabs, panes, whatnot. But I absolutely don't use tmux for that purpose. Every modern terminal that i've used since 2006-ish when I started using Terminator and iTerm2 is capable of creating tabs, splitting panes, resizing panes, zooming panes, and doing pretty much everything that our dear influencers use tmux for. My current favorite flavor of terminal is Ghostty, and it can absolutely do everything I described, and I can easily assign keyboard shortcuts to every single of those actions. The only feature that I don't have and tmux provides is the ability to detach from a session, and attach back to it, but in all honesty I don't need that feature as long as i'm working on my local laptop/desktop/whatever. My terminals are usually split in 4, i have multiple tabs, and i can zoom in and out of every pane.

## my tmux use case
Don't misunderstand me though. I love tmux, and I use it a lot, but ust never on the local machine. Most of my work involves connecting to remote hosts, and doing 'stuff and things' on those remote hosts, and this is where tmux is my absolute savior. I usually work in highly restricted environments, and i need to use jump hosts to connect to other remote hosts, and I absolutely always open a tmux session on the jump host, and use it as local terminal multiplexer to open sessions toward remote hosts. This saves me from a lot of grief if my vpn disconnects suddenly, since it preserves my open sessions as long as the jump host remains alive.<br>My second favorite use case for tmux is sharing a session with someone else. It's an amazing teaching/tutoring tool where two or more individuals can connect to the same terminal and be able to control the terminal at the same time (of course you need to coordinate this but thats down to you).<br>Now imagine having a local tmux session, connecting to a remote host, and opening another nested tmux session. From what I remember tmux documentation discourages this scenario, and in any case you would need to remap one of the sessions to a different leader key to make sure that the correct tmux instance is receiving commands. I just find it a lot easier not to think about this, since the default ctrl+b is deep in my muscle memory for everything tmux related.

## how to summarize?
tmux is a great tool. I love it, I use it daily, but i just don't use it in the way that is nowadays sold to the wide public on youtube. I guess that i'm not as cool and awesome as our tech influencers, but bottom line my job is not to create content and get views, but to do my actual job, where I tend to use my tools in the way they really fit me.