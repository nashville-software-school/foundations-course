# I am in a Python cohort

### Visual Studio Code

Visit the [Visual Studio Code](https://code.visualstudio.com/) website to download and install the code editor. This is the code editor you will be using for the next 3 months.

#### Extensions

Once Visual Studio Code is installed, there are several extensions that will be helpful for you as a beginner. Click on the links below to visit each extension page and click the **Install** button for each one.

* [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
* [Prettier Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* [Auto close tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
* [Live share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)
* [Multiple cursor case preserve](https://marketplace.visualstudio.com/items?itemName=Cardinal90.multi-cursor-case-preserve)
* [Code spell checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

### Install the Windows Subsystem for Linux

This process will install a new operating system _inside_ your Windows operating system. I know it sounds intimidating, but it's not.

1. Go to the `Start` menu (windows key) and search for `PowerShell`.
2. Run PowerShell as an Administrator. To do this, find the PowerShell application, then right-click on it and choose "Open as administrator".
3. Think of a username and password for this new operating system now. You will need it in the next step.
4.  Copy and paste this command into your PowerShell.

    ```
    wsl --install -d ubuntu
    ```
5. After the installation is done, a new window will come up and you will be prompted for your username and password. Your password won't appear as you type it. That's normal.
6. Keep this window open for now.
7. Then generate a Personal Access Token with a name of **NSS Installs Token**. Make it expire in 7 days. Scroll down into the permissions and check the `admin:public_key` checkbox and click it. Then scroll all the way down and save the token. **It is important you do not close, or refresh the browser tab until you complete the automated installs in the next section.**

### Basic Installations (automated)

1. Copy pasta the following command into the Ubuntu terminal from the last section and hit enter to run it. It will attempt to install some of the basic tools you need for NSS.

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/nashville-software-school/course-bash-scripts/main/client/installs-wsl.sh)"
```

### Windows Terminal

Visit the [Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701?activetab=pivot:overviewtab) download page and open it in the Microsoft Store App. This will be your default terminal (using Ubuntu) which you will use to navigate your file system, and run development tools throughout the course.

Once Windows Terminal is installed:

1. Go to the `Start` menu (windows key)
2. search for `Windows Terminal`
3. Open `Windows Terminal`
4. By default, this will open a new PowerShell terminal window. _Do **not** use the PowerShell terminal window._
5. Click the down arrow ﹀ located at the top of the terminal window.
6.  Select **Ubuntu** to open a new **Ubuntu Tab**.

    > _Ubuntu will begin to install and you'll be asked to wait for a minute or two for the installation to complete._
    >
    > **IMPORTANT:** It is very important that you remember both the username and password that you create in the next step. If you need to write them down to remember them, that's a great strategy.
7. Once Ubuntu is done installing, you'll be prompted to create a new user (and its password).
