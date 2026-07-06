---
title: Solving the Wi-Fi Disconnect Loop on Arch Linux
createdAt: 2026-06-28
updatedAt: 2026-07-05
description: Fix your WiFi connection dropping or not reconnecting upon startup or every log-in on your Arch Linux setup or any Linux setup with similar configuration
tags:
  - linux
  - arch
  - network
  - config
  - NetworkManager
  - windows
coverImage: arch-linux.jpg
draft: false
---
## Lore
Fiddling around Linux distros is slowly turning into a hobby and I finally committed to Arch Linux and using it full-time on a dual-boot setup. Now, as it is a full-time operating system for me I started noticing the pros and cons of it. Besides the roller-coaster experience, one thing that really bugged me was how the seamless WiFi and Bluetooth connectivity I had on Windows degraded significantly after I switched to Arch. 

Though, I shouldn't blame the distribution for it but the wrong choice of drivers I had. I lost count of articles and forum threads I had read for this exact issue. The hours I spent with all different LLMs trying to find the root cause of this issue and a probable fix drove me insane for days.
## The Problem
There might be one or both of the probable causes I found out that could cause buggy WiFi connections.

First one being, if you have a dual-boot setup and your other OS happens to be Windows, that could be a big culprit as it doesn't completely shut down your system, thus keeping the hardware locked and busy, hindering your second OS from having full control over it.

Second cause could be, two WiFi connection daemons fighting for establishing a connection first, though this should be handled by your hardware driver but some Realtek drivers like the `rtw89` driver (the same driver in my device) fail to manage this catastrophe and panic thus failing to provide you with a seamless experience.
## The fix
We'll be disabling the fast boot feature of Windows and checking if the problem still persists, and if it does, the hardware might be the real culprit behind the issue.

Nothing to worry about, we can fix that as well. To stop both daemons from racing with each other, we'll disable one and primarily shift to `iwd` as the connection backend to handle all WPA handshakes, while also disabling power saving configurations of NetworkManager to minimize further network lag problems.

![Typing Cat](cat-typing.webp)
<center>Let's jump into solution</center>

## Disable Windows Fast Boot
Most of the times, Windows' **Fast Boot** is the main culprit behind all the hassle you'll be facing throughout your dual-boot journey. The fast boot setup keeps some of your hardware busy so that your Windows takes a few fewer seconds to boot up but it's a ruined experience if Windows is not your only OS. So, it's better to turn that off. It doesn't matter if you're facing any issues or not, but you might later.
### The TUI way
It's way easier and straightforward to turn off the fast boot setting via the command prompt, so I'll go through that first.
1. Open **Command Prompt** as administrator.
2. Turn off hibernation: `powercfg -h off`.
3. Do a **complete** shutdown `shutdown /s /t 0`.
4. You're all set!

```cmd
powercfg -h off
shutdown /s /t 0
```
### The GUI way
If you're not the terminal kind of guy, I'll also go through the GUI way, but trust me, get your hands on the terminal and it'll be a life saver.
1. Open Control Panel.
2. **Go to Power Options:** Set the view by category to **Small icons** or **Large icons** in the top-right, then click on **Power Options**.
3. **Access Button Settings:** In the left-hand sidebar, click on **Choose what the power buttons do**.
4. **Unlock Greyed-Out Options:** At the top of the window, click the **Change settings that are currently unavailable** button.
5. **Disable Fast Startup:** Scroll down to the _Shutdown settings_ section at the bottom of the window. Uncheck the box for **Turn on fast startup (recommended)**.
6. **Save:** Click the **Save changes** button.

_This step-by-step guide was sourced from other forums. I trust it to be correct._
## Configure NetworkManager's backend
The `rtw89_8852ce` firmware generally has a much better track record when paired with `iwd` because `iwd` relies entirely on modern kernel features rather than large userspace libraries. We need to explicitly tell NetworkManager to use `iwd` and completely kill `wpa_supplicant`.

1. Create or edit the config file.
	```bash
	sudo vi /etc/NetworkManager/conf.d/wifi_backend.conf
	```
2. Add the following lines to your config file:
	```ini
	[device]
	wifi.backend=iwd
	```
3. Paste the above content with `Ctrl Shift V`.
4. Press **esc** then **:wq** to save and exit from vim.

It is not enough to just stop the service; we must mask it so that no other process can accidentally trigger it to start.

```bash
sudo systemctl stop wpa_supplicant.service
sudo systemctl disable wpa_supplicant.service
sudo systemctl mask wpa_supplicant.service
```

Delete the existing paired connection with `nmcli connection delete <SSID>`. Because NetworkManager handles secret storage differently between backends, your old connection profile might be corrupted or incompatible with the new flow.

Restart NetworkManager to apply the new backend configuration:
```bash
sudo systemctl restart NetworkManager.service
```

Once NetworkManager comes back up, try connecting to your Wi-Fi and entering the password again. Since `iwd` is now solely in control of the interface, the handshake should complete instantly without timing out.

> If you're still having problems connecting to the Wi-Fi, try the methods mentioned below and find the one that works for you!
## Disable Kernel ASPM and Power Saving
The default power-saving behavior often breaks the driver. When the device enters low-power states via PCIe Active State Power Management (ASPM), the firmware can fail to process registers, requiring a full system restart to recover the Wi-Fi card.

The following steps are for people with `rtw89` hardware driver, but if you're having a different hardware driver like `rtw88`, create a conf file with that name and look for the similar options for your driver.
1. **Create** a new conf file:
	```bash
	sudo vi /etc/modprobe.d/rtw89.conf
	```
2. Add the following lines to completely disable ASPM and power-saving modes for both the PCI and core components of the module:
	```conf
	options rtw89_pci disable_aspm_l1=y disable_aspm_l1ss=y
	options rtw89_core disable_ps_mode=y
	```
3. Paste the above content with `Ctrl Shift V`.
4. Press **esc** then **:wq** to save and exit from vim.

Once you're done, apply changes and reboot:
```bash
sudo mkinitcpio -P
reboot
```
## Disable MAC Address Randomization
NetworkManager randomizes your MAC address by default during Wi-Fi scans. The way NetworkManager handles this randomization can cause the connection to drop specifically with the `rtw89` driver. So, we'll turn MAC address randomization off. It's totally fine if you're on your home Wi-Fi or any network you trust. You don't need to be worried about turning it off.

Make sure you're using `NetworkManager` daemon as well, otherwise you can look up the correct configurations of whatever connection manager you're using.

*A tweak which might potentially fix your failing connection requests.*
1. **Create** a new conf file:
	```bash
	sudo vi /etc/NetworkManager/conf.d/30-disable-randomization.conf
	```
2. Add the following text to disable mac randomization:
	```ini
	[device]
	wifi.scan-rand-mac-address=no
	```
3. Paste the above content with `Ctrl Shift V`.
4. Press **esc** then **:wq** to save and exit from vim.

Once you're done, apply changes and reboot:
```bash
sudo mkinitcpio -P
reboot
```
### Disable NetworkManager Wi-Fi Power Saving
NetworkManager also attempts to manage Wi-Fi power states at the software level, which often conflicts with the kernel driver's state.
1. Open your NetworkManager config file:
	```bash
	sudo vi /etc/NetworkManager/conf.d/default-wifi-powersave-on.conf
	```
2. Add the following text to disable power saving mode (2 for disabled):
	```ini
	[connection]
    wifi.powersave = 2
	```
3. Paste the above content with `Ctrl Shift V`.
4. Press **esc** then **:wq** to save and exit from vim.

Once you're done, apply changes and reboot:
```bash
sudo mkinitcpio -P
reboot
```

I hope you got your problem fixed, happy hacking! Adios!