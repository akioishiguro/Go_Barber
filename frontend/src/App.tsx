import React from 'react';

import SingIn from './pages/SignIn';
import SingUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import AuthContext from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: 'Akio' }}>
      <SingIn />
    </AuthContext.Provider>

    <GlobalStyle />
  </>
);

export default App;
