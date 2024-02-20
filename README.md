## Online JSON editor
### Live demo
[DEMO](https://nice-sea-0e687dd03.4.azurestaticapps.net/)
### To run locally:
- Clone repository
- Clone and run the [backend](https://github.com/valchs/online-editor-api)
- run `npm install` then `npm start`

### Notes
I chose monaco-editor library as an editor because it supported JSON syntax highlighting and had all the features I needed.
As a backend I created a simple .NET Web API that simulates database with a static class.
For real time communication I'm using SignalR. All the web clients connect to the same Hub on the backend but each client is assigned to a specific group based on the file name so the communication between clients only happen within the same group.

In real world I would split `Editor.tsx` component into smaller components and improve the overall look of the page, especially the loading indicator which was only added for information purposes.
