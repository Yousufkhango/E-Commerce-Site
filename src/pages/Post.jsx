import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import "./postPageCSS.css";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="postPage">
            <Container>
                <div className="imgDiv">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                    />

                    {isAuthor && (
                        <div className="editDelBtn">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="transparent">
                                    Edit <i class="fa fa-edit" />
                                </Button>
                            </Link>
                            <Button onClick={deletePost} bgColor="transparent">
                                Delete <i class="fa fa-trash-o"></i>
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}
