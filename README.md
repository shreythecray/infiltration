# Create a Discord Bot that Automates Secret Messages with Node.js

## Before You Start

GitHub Repository: [https://github.com/shreythecray/infiltration](https://github.com/shreythecray/infiltration)

Follow along with the video tutorial: [tutorial embed]

We just launched our first hackathon and are giving away over $1K in prizes! Join us in building a cool project and winning any of the following prizes. 🏆

- **Courier Hacks 1st Place:** Top submission for use for notifications and demonstration of proper app-to-user notifications with the Courier API will receive $1000 via Zelle or PayPal.
- **Courier Hacks 2nd Place:** 2nd Place submission for use for notifications and demonstration of proper app-to-user notifications with the Courier API will receive the Apple AirPods Pro.
- **Public Favorite:** Public favorite winner will receive a Keychron Keyboard.
- **Runners-Up:** Runners-up submissions will receive a Hydro Flask.

Additionally, everyone who submits a project successfully integrating the Courier API will receive a $20 Amazon gift card! Submissions close on September 28th. Register now to submit this project for a chance to win some cool prizes.

Register for the Hackathon: [https://courier-hacks.devpost.com/](https://courier-hacks.devpost.com/)

Not sure where to start? In this tutorial, we will create a Discord bot that sends daily automated messages encrypted in Morse code with Node.js and the Courier API.

## What is Going On?

### Recap

We are secret agents, and we previously built an application to send secret messages encrypted in Morse code to communicate with our spy network. [Learn more >](https://www.courier.com/blog/hackathon-courier-api-nodejs/)

Last time, headquarters told us that one of our spies had leaked sensitive, top-secret information to our enemies, so we built a lie detector that alerted our spy network when we identified the mole. We used Azure's Cognitive Services to perform facial recognition on everyone on our team and Courier to broadcast the identity of the mole to our spy network. [Learn more >](https://www.courier.com/blog/serverless-lie-detector-facial-recognition/)

### What’s Next:

You have successfully identified the mule and have alerted your spy network! In an unfortunate turn of events, the mule happens to be your partner, Agent X, and now you are being suspected as a traitor as well. Since you are highly skilled, Headquarters knows what the Lie Detector won’t work on you, but you have been placed off-duty until you can prove that you are innocent.

Before you were removed from duty, you were able to use your Lie Detector to find out that the enemy has thousands of civilians under control in a secret Discord server. The civilians are being brainwashed with enemy propaganda every day. To prove your innocence, you decide to go undercover and infiltrate the enemy’s Discord server. With the help of Agent X, you have been added to the server as an administrator. Your plan is to create and install a Discord bot that automates encrypted messages to the civilians and alerts them about the situation so that they can escape.

### Pre-reqs:

- Admin access to a Discord server
- A cool undercover Agent name for your Discord bot
- Optional: a cool undercover Agent profile picture for your Discord bot

### Part 1: Set Up Node.js Project

- Create a new project
- Create three new files: “index.js”, “.env”, and “.gitignore”
- Install [dotenv npm package](https://www.npmjs.com/package/dotenv) to store variables: `npm install dotenv --save`
    
    Import and configure dotenv by adding to top of index.js: `require("dotenv").config();`
    
- Similarly, install [node-fetch npm package](https://www.npmjs.com/package/node-fetch) to store variables: `npm install node-fetch@2`
    
    Import and configure node-fetch by adding to top of index.js: `const fetch = require("node-fetch");`
    
- 

### Part 2: Create a Discord Bot

- [Sign up for (or log into) Courier >](https://courier.com/hack-now)
    
    [Discord docs on Courier >](https://www.courier.com/docs/guides/providers/direct-message/discord/)
    
- Open Discord provider in Channels > need bot token
- Create a Discord application
- Add Discord bot
- Copy bot token and paste it in Courier (keep token private)
- Give application permission to post as bot in your server
- Bot permissions: [https://discord.com/developers/docs/getting-started#adding-scopes-and-permissions](https://discord.com/developers/docs/getting-started#adding-scopes-and-permissions)
    - OAuth2 > URL generator
    - Scope: bot
    - Permissions: View Channels, Send Messages, Read Message History
    - Go to generated URL
    - Invite to server to authorize
- Set up Discord provider in Courier

### Part 3: Send Messages

- Go to Courier’s notification designer
- Create a new notification
- Add the Push notification channel with Discord as the provider
- Click on the Push channel to edit the message
- Write and publish your message
- Copy notification template ID from notifications setting > add as `templateID` in .env file
- Profile settings > Advanced > Developer Mode ✅ > right click on channel and copy ID > add as `channel_id` in .env

Our message will be:

### Part 4: Encrypt Message with the Morse API

- Create an asynchronous function called `encryptMessage()`, which takes `originalMessage` as a parameter. This function will call the Morse API, which will allow us to translate any message from English to Morse code. The enemy will have to spend more time and resources into decrypting our messages, which will give our civilians time to escape from the server.
    
    ```jsx
    async function encryptMessage(originalMessage) {
    }
    ```
    
- Let’s define the GET API call options:
    
    ```jsx
    const morseOptions = {
    	method: 'GET',
    	headers: {
    		Accept: 'application/json',
    		'Content-Type': 'application/json'
    	}
    };
    ```
    
- We need to attach the `originalMessage` function parameter to the Morse API endpoint:
    
    ```json
    const morseEndpoint = "https://api.funtranslations.com/translate/morse.json?text="+originalMessage
    ```
    
- You need to be able to access the translation from this API call in the body of the Courier API call. To call the API, we can use node-fetch as we did before.
    - Create a variable called `morseResponse`, which will hold the entire response from this call.
    - Convert the JSON object into a JavaScript object `morseResponseJSON` so that you can read it within your code.
    - Get the translated message out of that object and save it in a new variable called `encryptedMessage`.
    - Return `encryptedMessage` so that we can call this function to access it elsewhere.
    
    ```jsx
    const morseResponse = await fetch(morseEndpoint, morseOptions);
    const morseResponseJSON = await morseResponse.json();
    const encryptedMessage = morseResponseJSON.contents.translated;
    console.log(encryptedMessage);
    return encryptedMessage;
    ```
    

### Part 5: Automate Messages

[Learn about Automations >](https://www.courier.com/docs/automations/)

[Check out the Automations API reference >](https://www.courier.com/docs/reference/automation/invoke/)

- Create a new asynchronous function called `runDiscordAutomation()`, which will call the `encryptMessage()` function to translate a message and use the Courier API to automatically send messages in the enemy Discord server everyday.
    
    ```
    async function runDiscordAutomation() {
    }
    ```
    
- Before we can run our message through the Morse translation API, we need to ensure that our it is in the correct format, with all spaces converted into their URL encoding, `%20` as shown below. We can call `encryptMessage()` with `originalMessage` as a parameter to translate it. `encryptedMessage` will evaluate as the translated message.
    
    ```jsx
    const originalMessage = "run%20while%20you%20can%20you%20can%20find%20shelter%20here:%20https://discord.com/invite/courier";
    const encryptedMessage = await encryptMessage(originalMessage);
    ```
    
- Let’s define the Courier Automation endpoint and options:
    
    ```jsx
    const automationsEndpoint = "https://api.courier.com/automations/invoke"
    
    const courierOptions = {
    	method: "POST",
    	headers: {
    		Accept: "application/json",
    		"Content-Type": "application/json",
    		Authorization: 'Bearer ' + apiKey
    	},
    	body: JSON.stringify({
    		//automation steps
    	}),
    };
    ```
    
- The body object within the options will encompass two objects: `automation` and `data`
    - The `automation` object will include a `steps` array, which will consists of all steps required for the automation. Our automation consists of reminders that are sent once a day - in this case we will be adding three steps: a send step, a delay, and another send step (so on).
    - Each step will need to be defined with two objects: the type of `action` (send, delay, cancel, etc.) and `message`. The `message` consists of the notification template ID (we saved this in the .env file earlier) and information about where you are sending this message. A Discord message requires either a `user_id` or a `channel_id`. In order to reach as many innocent civilians as possible, as quickly as possible, we will directly send messages in a channel.
    - [Learn more about sending to a channel via Courier >](https://www.courier.com/docs/guides/providers/direct-message/discord/#sending-a-message-to-a-channel)
- 
- Add a send step
- Add a delay step - 1 minute for testing (you can also leave this out to save time during testing and add it later)
- Add another send step - we can use the same notification template ID for both send steps, and use the data to update the message itself

```jsx
const courierResponse = fetch(automationsEndpoint, courierOptions)
```

## Conclusion

Our Discord bot is ready to save some civilians. Try building a Discord bot of your own and tweet a screenshot of your Courier automated messages in action, and we will send a gift to the first three Secret Agents to complete this task! Head to [courier.com/hack-now](http://courier.com/hack-now) to get started. Don’t forget to submit your project to our [Hackathon](https://courier-hacks.devpost.com/) for a chance to win over $1000 in cash and prizes!

### Quick Links

🔗 GitHub Repository: [https://github.com/shreythecray/infiltration](https://github.com/shreythecray/infiltration)

🔗 Video tutorial: TBD

🔗 Courier: [app.courier.com](https://bit.ly/3QPiFg3)

🔗 Register for the Hackathon: [https://courier-hacks.devpost.com/](https://courier-hacks.devpost.com/)

🔗 Courier Discord Provider Docs: 

🔗 Courier Automations Docs:

🔗 Courier Automations API Reference: [https://www.courier.com/docs/reference/](https://www.courier.com/docs/reference/)

🔗 Discord Application and Bot Guide: