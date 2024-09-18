import { Home } from "./pages/Home";
import AppProvider from "./context";

import "./styles/global.scss";

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;
