import { AppRouter } from "./AppRouter";
import { Providers } from "./Providers";

function App() {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}

export default App;
