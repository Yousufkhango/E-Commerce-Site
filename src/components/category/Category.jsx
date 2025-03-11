import React, { use, useEffect, useState } from 'react'
import appwriteService from "../../appwrite/config";
import { Container, PostCard } from '..'
import { Query } from 'appwrite';
import { useParams } from 'react-router-dom';

function Electronics() {
    const [items, setItems] = useState([])
    const slug = useParams()
    

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        appwriteService.getItem([Query.equal('category', slug.slug)]).then((items) => {
            if (items) {
                setItems(items.documents)
            }
        })
    }, [slug])
    
    if (items.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Items Not Found
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <Container>
            <div className='post-container'>
                {items.map((post) => (
                    <div key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default Electronics
