import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Logo, Input, Container } from "./index";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form"
import { sellerLogin as sellerAuthLogin } from '../store/sellerAuthSlice'

export default function SellerLogin() {

    const [seller, setSeller] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        if (seller) {
           if(seller) dispatch(sellerAuthLogin({userData : seller}));
            if (data.email === seller.email && data.password === seller.password) {
                navigate("/add-post") // navigate to the seller dashboard
            }else{
                setError("Invalid email or password")  
            }
        } 
        else {
            setError("Seller not found")
        }
    }

    const userData = useSelector((state) => state.auth.userData);

    const userId = userData ? userData.$id : null;
    useEffect(() => {
        if (userId) {
            appwriteService.getSeller(userId).then((seller) => {
                if (seller) setSeller(seller);
                else navigate("/");  // if no seller found, navigate to become a seller page
            });
        } else navigate("/"); // if no seller found, navigate to become a seller page
    }, [slug, navigate]);


    return (seller) ? (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your Seller Account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
}

