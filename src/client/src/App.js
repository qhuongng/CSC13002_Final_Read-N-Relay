import MainLayout from "./layouts/MainLayout";

import { useEffect } from "react";

function App() {

    // useEffect(() => {
    //     const fetchPosts = async() => {
    //         try{
    //             const response = await api.get('/posts');
    //             setPosts(response.data);
    //         }
    //         catch (error) {
    //             console.log(error)
    //         }
    //     }

    // fetchPosts();
    // },[])

    return (
        <div className="App">
            <MainLayout />
        </div>
    );
}

export default App;
