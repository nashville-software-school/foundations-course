---
description: >-
  These steps configure your Github account so that you are prepared to use it
  at NSS.
---

# Configure Your Github Account

### Security Token for Installations

In order to automate the installation of the tools you need, you need to create a Github Personal Access Token.

1. Open a new tab in your browser.
2. Go to this site [https://github.com/settings/profile](https://github.com/settings/profile)
3. In the menu options on the left, scroll down to and click the item labeled **Developer Settings**.
4. Click **Personal access tokens**
5. Click **Tokens (classic)**
6. Click **Generate new token** button
7. Choose **Generate new token (classic)**
8. Complete 2-factor authentication if you set that up

You will now see the screen to generate a token.

1. In the **Note** field, enter _NSS Installs Token_.
2. Make it expire in 7 days.
3. Scroll down into the permissions and check the `admin:public_key` checkbox and click it.
4. Scroll all the way down and click **Generate token**.
5. Your new token will then be displayed to you with a green background color, and will start with `ghp_`.
6. Click the copy icon next to it to copy it to your clipboard.
7. Open the **Terminal** application on your Mac.
8.  Enter the following text into the Terminal but don't press the return key.

    ```
    export PERSONAL_ACCESS_TOKEN=
    ```
9. Press **Command+V** to paste your personal access token at the end. If nothing happened, go back to the browser and copy your access token again.
10. Press the return key.
11. Copy and paste the following command into the terminal. It will ask you to enter in some information about your Github account.

    ```
    /bin/bash -c "$(curl -fsSL https://gist.githubusercontent.com/stevebrownlee/b146bf49071c46c41eddf5778b147a71/raw/163e9eb5ba26458f13a51508b80ea462ec4c708e/create-key.sh)"
    ```

