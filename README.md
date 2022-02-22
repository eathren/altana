## Altana Search and Node-Graph Render

### Setup

This project allows the search and render of information based from Altana's API.

First, you will need to supply your own .env file. In the root of the project, just include a .env file, and add the field seen in Example.env.

### Installation

Next, install the node-packages. You can use<code> npm i </code>, or <code> yarn add</code>

### Running The Program

Program can be run with <code> npm start</code> or <code> yarn start</code>, depending on your configuration.

### Description.

This program includes a search bar. Input what you want to search for (I have been using Starbucks). After a moment or two, a list will be generated based on the API results. Click one of the results.

This will bring you to a page where two fetches will happen [note 1]. The first will refetch the company information. The other will fetch exclusively the trading-partners of the supplied ID.

If there are relationships, it should then list a node-graph of all the suppliers to that node.

Clicking a node will repeat this double fetch, but with the new ID. It can go as long as you have options to click, but each will appear in their own page.

Note 1:
It was a bit unessary to use the second trading-partners fetch, as it was a field under the company fetch. But the supplied instructions mentioned to that both were available, so I wanted to include it as an option.

Credit: Nolan Braman

![search](https://i.imgur.com/UeBkpgp.png)
![graph](https://i.imgur.com/4Rq1IXw.png)
