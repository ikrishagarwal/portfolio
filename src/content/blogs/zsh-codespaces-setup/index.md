---
title: Setup guide for ZSH in GitHub codespaces
createdAt: 2026-06-28
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
## Lore
I was a hard-core user of github's codespaces feature since the day it was launched, and it's a great choice for people which a low end device or who needs a little extra resources for a specific project. The only thing which left me unsatisfied was the barebone bash shell slammed on my face on every codespace.

So let's move towards solving this issues, we'll be setting up ZSH (Z-Shell) as an alternative to bash, starship for a modern era terminal look, and then a few must have ZSH plugins to 10x your experience. 

This guide is not just limited to codespaces setup, anyone trying to configure ZSH for a minimal day to day usage can follow the guide as well.
## Table of Contents

- [Setup Starship](#setup-starship)
- [Install Auto Suggestions](#install-zsh-auto-suggestions)
- [Install ZSH Syntax Highlighting](#install-zsh-syntax-highlighting)

## Setup Starship

First of all, we'll be styling our shell to have the modern era look and feel, and it's not that boring dollar sign slammed on your face again. Let's install [starship](https://starship.rs/).

### Install starship

> For some reason, you won't be able to install starship in ZSH at the time of writing this. You can switch to bash for this one.

```bash
curl -sS https://starship.rs/install.sh | sh
```

### Setup the config in the ZSH file

```bash
echo "eval \"\$(starship init zsh)\"" >> ${ZSOTDIR:-$HOME}/.zshrc
```

You can go over more themes on [starship's website](https://starship.rs/presets/) and I personally like the [Nerd Font Preset](https://starship.rs/presets/nerd-font) and that's also the won't on the banner of this guide.
## Installing ZSH Plugins
This guide is to get the work done as quickly as possible so we'll be relying on directly installing and invoking plugins from `.zshrc` directly. If you are following this guide for a day to day usage then I'd recommend you to use [Oh My ZSH](https://ohmyz.sh/) for invoking plugins so that it's way easier to manage plugins.
## Auto Completions in ZSH
We'll be setting up auto completions in ZSH, so that you can quickly reuse past used combinations by hitting tab without having to write it every time. We'll be using [ZSH autosuggestions plugin](https://github.com/zsh-users/zsh-autosuggestions ) for this one.

1. Clone the repository

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
```

> _You can change the path to anything you want. Here we're using `~/.zsh/zsh-autosuggestions`_

2. Add the invoke script to the ZSH config

```bash
echo "source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh" >> ${ZSOTDIR:-$HOME}/.zshrc
```

## Syntax Highlighting in ZSH
You must be bored by now starring at that boring mono colored grey text on your terminal, so let's add some colors to it. We'll use [ZSH Syntax Highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/) plugin to get a colorful looking shell.

1. Clone the repository

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.zsh/zsh-syntax-highlighting
```

2. Add the invoke script to the ZSH config

```bash
echo "source ~/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc
```

_Note: If you see a `Systemd` in the terminal and want to remove it then follow the next command. This one is specific to codespaces.

```bash
mkdir -p ~/.config && printf "[container]\ndisabled = true" >> ~/.config/starship.toml
```

**Voila! You are ready to use ZSH with Starship and ZSH Auto Suggestions and Syntax Highlighting.**

## Bonus: Let's automate the process
Instead of manually doing all this process again and again for every new codespace you create, we'll be setting up global configs for codespaces to automatically configure your ZSH upon creation.
1. Go to your github and create a new repository with the `dotfiles`, make sure it's in format `https://github.com/<your username>/dotfiles`.
2. Create a file `setup.sh` on the root of your repository.
3. And paste the following content into it:
```sh
# Install and configure Starship
curl -sS https://starship.rs/install.sh | sh -s -- --yes
echo "eval \"\$(starship init zsh)\"" >> ${ZSOTDIR:-$HOME}/.zshrc

# Install and configure ZSH Auto Suggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
echo "source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh" >> ${ZSOTDIR:-$HOME}/.zshrc

# Install and configure ZSH Syntax Highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.zsh/zsh-syntax-highlighting
echo "source ~/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc

# Remove the `Systemd` message in starship terminal
mkdir -p ~/.config && printf "[container]\ndisabled = true" >> ~/.config/starship.toml
```

And you're done! For reference you may have a look to my [dotfiles](https://github.com/ikrishagarwal/dotfiles/blob/main/setup.sh).