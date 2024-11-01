---
description: >-
  These instructions are only for learners who will be using a Macbook during
  NSS.
---

# I am using Mac operating system

### Install XCode

This process will take some time, and it is needed for future steps, so you get it out of the way first. If you have an older or slower computer, it may appear as if nothing is happening, but it is. Just wait until the process is complete.

1. Open the **Terminal** application
2. Paste the following command into the terminal and press **Enter** to begin installation.

```
xcode-select --install
```

### Install Homebrew

Run the following command in your **Terminal** application. You will be prompted for your computer password. It will not display the characters as you type them for security reasons.

```
/bin/bash -c "$(curl -fsSL https://gist.githubusercontent.com/stevebrownlee/b146bf49071c46c41eddf5778b147a71/raw/47a842f39a43a4b7d7c3dafcb127c74f99082580/install-homebrew.sh)"
```

Once the process is complete, run the `brew` command in your terminal. If you see the output `command not found: brew` then contact an mentor.

### Install Modern Shell

Run the following command in your **Terminal** application.

```
/bin/bash -c "$(curl -fsSL https://gist.githubusercontent.com/stevebrownlee/b146bf49071c46c41eddf5778b147a71/raw/47a842f39a43a4b7d7c3dafcb127c74f99082580/configure-zsh.sh)"
```

Once complete, run the following command in your **Terminal**.

```
echo $SHELL
```

You should see either `/usr/local/bin/zsh` or `/bin/zsh` as the output of that command. If you don't, contact an mentor.

### Install Node

Run the following command in your **Terminal**.

```
/bin/bash -c "$(curl -fsSL https://gist.githubusercontent.com/stevebrownlee/b146bf49071c46c41eddf5778b147a71/raw/47a842f39a43a4b7d7c3dafcb127c74f99082580/install-nvm-node.sh)"
```

Once the process is complete, quit your Terminal application completely, and then open it again immediately.

Run the following command in your **Terminal**:

```bash
node -v
```

If you see the the following output, then contact an mentor. Otherwise, it was successful.

```bash
command not found: node
```

### Rectangle

[Download and install Rectangle](https://www.rectangleapp.com/). This application will allow you to use certain combinations of keys on your keyboard to move and resize applications while you are developing.

Invest 9 minutes of your time to watch the [Using Rectangle to Manage macOS Windows](https://www.youtube.com/watch?v=tFeDyqZG4z4) video now to learn how to use Rectangle. If you start using it **today**, then you will save yourself hours upon hours of headache and lost productivity as you learn to become a professional software developer.

### Visual Studio Code

Visit the [Visual Studio Code for Mac](https://code.visualstudio.com/docs/setup/mac) page and follow the instruction for installation and launching from the command line.











