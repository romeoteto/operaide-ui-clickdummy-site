# Operaide UI Clickdummy

This is a clickdummy of our Operaide platform. Its purpose is to showcase latest UI / UX design developments. It is a guideline for developers on how our Operaide platform should look and feel.

## User Login

The clickdummy simulates a user login and roles. Currently three different users are available for testing:

- anna.endanwenderin@senseca.com
- oliver.orgadmin@senseca.com
- stefan.superadmin@senseca.com

You don't need a password on the login screen, just type the email to load the respective user settings.

### Definition of users

1. Stefan Superadmin has global rights in the plattform. He can manage global system settings like organizations, users etc. and is also admin in all organizations.
2. Oliver Orgadmin is member of two organizations. In one org he has only member rights but in the other he has administration rights on organization level.
3. Anna Endanwenderin is only member of one organization and has no admin rights.

### Some additional remarks

Currently the roles simulate only the visibility of some menu entries in the sidebar and the possibility to select organizations in the user menu. There is no logic implemented on Reaktor visibility for example or any other defined logic related to roles, rights and permissions. The role concept should only showcase UI behavior and is NOT a meaningful definition of roles and permissions in the system.

## ELARA

The clickdummy features Elara - a chatbot UI that enables users to chat with "chat-ready" Reaktors.

### Chat types

Elara currently simulates two types of chat:

1. If you choose "Chat with Orders" from the top bar menu you chat with the order database from the "Order Manager" app. This app contains of two Reaktors: one Reaktor ("Analyzing Orders Agent") that analyzes orders and puts them into an ERP and "Order Chat" that simulates chatting with these order data in the ERP.
2. If you choose any other chat type you simply chat with a GPT-4o model from a standard OpenAI API.

### Chat implementation

The chat UI is entirely based on the following:

- Ant Design X library for chat UI components
- Simple OpenAI API integration with streaming
- markdown-it dependency (and plugins) for markdown rendering
- highlight.js dependency for code rendering

### OpenAI API

Watchout: currently the OpenAI key is hardcoded in the chat component. This is my private key so please handle it with care!
