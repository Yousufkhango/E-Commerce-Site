import React, { use, useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, Footer, PostCard } from '../components'
import './home.css'
import { Query } from 'appwrite';
import { href } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([])
    const [electronics, setElectronics] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        // All products
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
        // All products

        // Category products
        appwriteService.getItem([Query.equal('category', 'electronics')]).then((electronics) => {
            if (electronics) {
                setElectronics(electronics.documents)
            }
        })
        // Category products
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Loading...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <Container>
            {
                electronics.length >= 6 ? <div className="category-home">
                <div className="text">
                    <div className="category-heading">
                    <h1>Latest Electronics</h1>
                    </div>
                    <div className="show-more">
                    <a href="/category/electronics">Show more</a>
                    </div>
                </div>
                <div className="category-card">
                    {electronics.map((item) => (
                        <div key={item.$id}>
                            <PostCard {...item} />
                        </div>
                    ))}
                </div>
            </div>: null
            }
            <div className='post-container'>
                {posts.map((post) => (
                    <div key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            <Footer/>
        </Container>
    )
}

export default Home