// ThemeContext.tsx
import React, { createContext} from 'react';


export const ThemeContext = createContext<string>("light");

// export const Switch = (props) => {
//     const theme = useContext(ThemeContext);
//     return (
//         <header className={theme}>
//             <button name="change_theme" onClick={toggleTheme}>
//                 Change Theme
//             </button>
//         </header>
//     );
// };
