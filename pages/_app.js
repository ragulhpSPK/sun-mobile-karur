import Layout from "@/components/Layout";
import "tailwindcss/tailwind.css";
import "@/styles/globals.css";
import store from "@/redux/store";
import { Provider } from "react-redux";

function App({ Component, pageProps }) {
  return (
    <div>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </div>
  );
}
export default App;
