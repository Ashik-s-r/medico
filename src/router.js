import { createBrowserRouter } from "react-router-dom";
import Singup from "./components/auth/signup";
import Login from "./components/auth/login";
import ListPost from "./components/blog/listpost";
import AddPost from "./components/blog/addpost";
import ViewPost from "./components/blog/viewpost";
import DeleteListitem from "./components/blog/delete";
import EditPost from "./components/blog/editpost";

const router = createBrowserRouter([
    { path:'', element: <Singup/>},
    { path:'/login', element: <Login/>},
    { path:'/list', element:<ListPost/>},
    { path:'/add', element: <AddPost/>},
    { path:'/blog/posts/delete', element:<DeleteListitem/>},
    { path:'/blog/posts/:postId/edit', element:<EditPost/>},
    { path: 'blog/posts/:postId', element: <ViewPost/>},
])

export default router