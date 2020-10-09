# inventory-server

The server requires an instance of mongoDb running and accessible.
Before launching the server, environment variables must be set in the `.env` file.
`DATABASE_URL` MUST absolutely be set prior to launching the server: the others variables can take default values present in the code.

The server launches using `npm start` (Don't forget to run `npm install` :-) )

This repo contains a postman collection file:  This file contains 4 requests: 
- Login root: 
    To log the root user
- Logout root: 
    To unlog the root user
- Post example promocode:
    To post the promocode given in the email
- Get example promocode:
    To retrieve the promocode that you can post using Post promocode


Todo Make medias and model.
