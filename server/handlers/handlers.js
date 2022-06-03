// Handlers that are needed:

// A POST handler that takes care of sign in (look up slingair and facespace for refs)

// A GET handler for all the current schedule (this is similar to the get everything that you have done before (getflights, getres)).

// the sign in handler has two functions, first is you will need to wait for response from google (it will give you your gmail account).
// Make the sign in also a sign up (I.E. If the information for the login is not found, just make it make one. You only need the email)

// A POST handler for the admin that creates new classes on future times (days and times). Do not allow it to make on the same day or in the past.

// A PATCH to modify those classes.

// A DELETE to delete a class.

// When a non-admin user logs in a PUT to sign up the class (to sign up for a class)

// A PATCH to delete the name of the users attending a class.


// We will also need helpers (like what Andrew showed in making a random client)

// One helper to make a random class/session. Another helper to make random clients