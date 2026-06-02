import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from "./redux/store";
import { RouterProvider } from 'react-router-dom'
import router from "./router"
import { Toaster } from 'react-hot-toast'

document.documentElement.dir = "rtl";
document.documentElement.lang = "ar";
document.documentElement.setAttribute("data-theme", "dark");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" duration={500} />
    </Provider>
  </React.StrictMode>
);