import { createContext } from 'react';

/* React Context to store the user value (true or false) and make accessible across the app
* is used to toggle user login and logout to render the corresponded screen.
* */
export const UserContext = createContext(null);