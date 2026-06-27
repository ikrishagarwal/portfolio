---
title: Setup guide for ZSH in GitHub codespaces
createdAt: 2026-06-27
updatedAt: 2026-06-27
description: Guide on setting up ZSH in Github's Codespaces along with how to style it with Starship and adding utilities like auto suggestions and syntax highlighting
tags:
  - zsh
  - github
  - codespaces
  - starship
  - shell
  - terminal
  - linux
coverImage: zsh-codespaces-setup.webp
draft: false
---
## Setup ZSH

This post will guide you through to set up starship along with zsh suggestions and zsh syntax highlight for your codespaces.

## Table of Contents

- [Setup Starship](#setup-starship)
- [Install Auto Suggestions](#install-zsh-auto-suggestions)
- [Install ZSH Syntax Highlighting](#install-zsh-syntax-highlighting)

## [Setup Starship](https://starship.rs/)

This is an optional package if you want to beautify your terminal. Else you can also use any other ZSH themes.

### Install starship

> You cannot install starship in ZSH shell at the time of writing this. You can switch to bash.

```bash
curl -sS https://starship.rs/install.sh | sh
```

### Setup the config in the ZSH file

```bash
echo "eval \"\$(starship init zsh)\"" >> ${ZSOTDIR:-$HOME}/.zshrc
```

## [Install ZSH Auto Suggestions](https://github.com/zsh-users/)

1. Clone the repository

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
```

> _You can change the path to anything you want. Here we use `~/.zsh/zsh-autosuggestions`_

2. Add the invoke script to the ZSH config

```bash
echo "source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh" >> ${ZSOTDIR:-$HOME}/.zshrc
```

## [Install ZSH Syntax Highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/)

1. Clone the repository

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.zsh/zsh-syntax-highlighting
```

2. Add the invoke script to the ZSH config

```bash
echo "source ~/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc
```

_Note: If you see a `Systemd` in the terminal and want to remove it then follow the next command_

```bash
mkdir -p ~/.config && printf "[container]\ndisabled = true" >> ~/.config/starship.toml
```

**Voila! You are ready to use ZSH with Starship and ZSH Auto Suggestions and Syntax Highlighting.**

If you like it consider following me on [github](https://github.com/ikrishagarwal)