import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'
import Post from './pages/Post.jsx'
import EditPost from './pages/EditPost.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import { AddItemForm, AuthLayout, Login, Signup } from './components/index.js'
import { Category } from './components/category/index.js'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category/:slug",
        element: <Category />,
      },
      {
        path: "/add-Item",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddItemForm />
          </AuthLayout>
        ),
      },
      {
        path: "/cart",
        element: (
          <Cart />
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },


      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/item/:slug",
        element: <Post />,
      },
      {
        path: "*",
        element: <PageNotFound />
      },
      {
        path: "/*",
        element: <PageNotFound />
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
