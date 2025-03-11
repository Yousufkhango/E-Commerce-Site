import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import "./ProductPageCSS.css";
import { Query } from "appwrite";

export default function Post(data) {
    const [item, setItem] = useState(null);
    const { slug } = useParams();
    const [otherItems, setOtherItems] = useState([])


    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    let isAuthor = false
    if (userData) {
        console.log(userData.labels[0]);
        if (userData.labels[0] === 'seller') {
            isAuthor = true
        }

    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (slug) {
            appwriteService.getPost(slug).then((item) => {
                if (item) {
                    setItem(item);
                    appwriteService.getItem([Query.equal('category', item?.category), Query.notEqual('$id', item.$id)]).then((otherItem) => {
                        if (otherItem) setOtherItems(otherItem.documents)
                    })
                }

                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);


    const deletePost = () => {
        if (confirm('Are You Sure You Want To Delete This Item') == true) {

            appwriteService.deleteItem(slug).then((status) => {
                if (status) {
                    appwriteService.deleteFile(item.images_1);
                    appwriteService.deleteFile(item.images_2);
                    appwriteService.deleteFile(item.images_3);
                    appwriteService.deleteFile(item.images_4);
                    appwriteService.deleteFile(item.images_5);
                    navigate("/");
                }
            });
        }
    };

    // ON WORKING !!!
    // const addToCart = () => {
    //     dispatch(addItem(post))
    // }

    const [imga, setImga] = useState("true")
    function changePic1(e) {
        setImga(e.target.src)
    }

    const [qty, setQty] = useState(1)
    const handleChange = (e) => {
        setQty(e.target.value);
    }
    console.log(item);

    return item ? (
        <div className="postPage">
            <Container>
                {isAuthor && (
                    <div className="editDelBtn">
                        <Link to={`/edit-post/${item.$id}`} className="edit">
                            <Button>
                                Edit <i class="fa fa-edit" />
                            </Button>
                        </Link>
                        <Button onClick={deletePost} className="delete">
                            Delete <i class="fa fa-trash-o"></i>
                        </Button>
                    </div>
                )}
                <div className="imgDiv">
                    {
                        imga != "true" ? <img src={imga}></img> : <img src={appwriteService.getFilePreview(item.images_5)}></img>
                    }
                    <div className="imgButtons">
                        <div onClick={changePic1}><img src={appwriteService.getFilePreview(item.images_5)} alt="" /></div>
                        <div onClick={changePic1}><img src={appwriteService.getFilePreview(item.images_1)} alt="" /></div>
                        <div onClick={changePic1}><img src={appwriteService.getFilePreview(item.images_2)} alt="" /></div>
                        <div onClick={changePic1}><img src={appwriteService.getFilePreview(item.images_3)} alt="" /></div>
                        <div onClick={changePic1}><img src={appwriteService.getFilePreview(item.images_4)} alt="" /></div>
                    </div>

                </div>
                <div className="text-area">
                    <div className="title">
                        <h1>{item.productName}</h1>
                    </div>
                    <div className="qty-sec">
                        <span>Quantity</span>
                        <select name="quantity" id="quantity" onChange={handleChange}>
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                        </select>
                    </div>
                    <div className="price-section">
                        <div className="first">
                            <span className="label">Price</span>
                            <span className="price-span">
                                <span>RS</span>
                                {
                                    (qty < 3) ? <span className="price">{item.price}</span> : <span className="price">{item.price - item.discount}</span>
                                }
                            </span>
                            <span className="disc-note">Note: For Discount Order Minimum 3 pcs</span>
                            <div className="old-dis">
                                <div className="old-price">
                                    <span>Rs:</span>
                                    <span><strike>{item.price}</strike></span>
                                </div>
                                <div className="discount">
                                    <span>Rs:</span>
                                    <span>{item.discount} Save</span>
                                </div>
                            </div>
                        </div>
                        <div className="availablity">
                            <span className="label">Availablity</span>
                            <span className="stock">In-Stock</span>
                        </div>
                    </div>
                    <div className="category-sec">
                        <span>Category:</span>
                        <span>{item.category}</span>
                    </div>
                    <div className="desc-section">
                        <h1>Description:</h1>
                        <p>{item.description}</p>
                    </div>
                </div>
                {
                    otherItems.length != 0 ? <Container>
                        <div className="other-items post-container">
                            {otherItems.map((e) => (
                                <div key={e.$id}>
                                    <PostCard {...e} />
                                </div>
                            ))}
                        </div>
                    </Container>  : null
                }
                <div className="last-row">
                    <div className="buttons">
                        <button className="share-btn">
                            <a href={`https://wa.me/?text=https://rhino-scales.netlify.app/item/${item.$id}`} target="_blank">
                                <span>Share </span>
                                <img src="/share.png" />
                            </a>
                        </button>
                        <button><a href={`https://wa.me/+923197377307?text=https://rhino-scales.netlify.app/item/${item.$id}%0AQuantity%20${qty}%0APrice%20Per%20Unit:%20${(qty > 2) ? item.price - item.discount : item.price}%0ATotal%20Price:%20${(item.price - item.discount) * qty}%0APlace%20Order%20Now`} target="_blank">Buy Now</a></button>
                    </div>
                </div>

            </Container>
        </div>
    ) : null;
}
