---
draft: true
date: 2025-05-05
tags:
  - nocturne
  - deployment
---
# [[deployment_flow]]
Nocturne deployment flow

1. init script from github
2. init script actions
	1. install git, less, unzip
	2. clone nocturne and nocturne-dotfiles
	3. detect platform
		1. decide whether to proceed or exit based on platform
	4. run platform bootstrap script
		1. platform bootstrap runs common bootstrap
	5. start interactive part of deployment
3. interactive deployment
	1. select and configure software
4. finish deployment
5. reboot

