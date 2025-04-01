# Operaide UI Clickdummy

This is a clickdummy of our Operaide platform. Its purpose is to showcase latest UI / UX design developments. It is a guideline for developers on how our Operaide platform should look and feel.

## User Login

The clickdummy simulates a user login and roles. Currently three different users are available for testing:

- anna.endanwenderin@toyota.de
- oliver.orgadmin@toyota.de
- stefan.superadmin@toyota.de

You don't need a password on the login screen, just type the email to load the respective user settings.

### Definition of users

1. Stefan Superadmin has overall right in the plattform. He can manage global system settings like organizations, users etc.
2. Oliver Orgadmin is member of two organizations. In one org he has only member rights but in the other he has administration right on organization level.
3. Anna Endanwenderin is only member of one organization and has no right.

### Some additional remarks

Currently the roles simulate only some menu entries in the sidebar and the possibility to select organizations in the user menu. There is no logic implemented on Reaktor visibility for example. The role concept should only showcase UI behavior and is NOT a meaningful definition of roles and permissions in the system.
