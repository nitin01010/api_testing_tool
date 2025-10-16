"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

export default function ElementBox() {
    const [history, setHistory] = useState([]);
    const [select, setSelected] = useState('GET');
    const [url, setUrl] = useState();

    const fetchHistory = async () => {
        try {
            const historyRes = await axios.get("/api/request");
            setHistory(historyRes.data.history);
        } catch (error) {
            console.error("Failed to fetch history:", error);
        }
    };

    // Fetch history on mount
    useEffect(() => {
        fetchHistory();
    }, []);

    const handleSubmit = async () => {
        if (!select || !url) {
            toast.warn("Method and URL are required!");
            return;
        }

        try {
            const res = await axios.post("/api/request", {
                method: select,
                url: url,
            });

            toast.success("Request successful!");

            // Refresh history after successful request
            await fetchHistory();

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while sending the request!");
        }

        // Reset form fields
        setSelected("GET");
        setUrl("");
    };

    const handleDelete = async (id) => {
        if (!id) return;
        try {
            await axios.delete("/api/request", { data: { id } });
            setHistory((prevHistory) => prevHistory.filter((item) => item._id !== id));
            toast.success("History item deleted!");
        } catch (error) {
            console.error("Failed to delete history item:", error);
            toast.error("Failed to delete history item");
        }
    };


    return (
        <div className=" flex gap-2 flex-col bg-gray-50 rounded-md p-[16px] h-[400px] overflow-scroll w-full sm:w-[80%]">
            <div className=" flex gap-2">
                <select onChange={(ele) => setSelected(ele.target.value)} className=" font-semibold   bg-white  text-black  shadow rounded-md w-[100px] py-2 p-2 outline-none h-[40px]">
                    <option value="GET"> GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
                <input onChange={(e) => setUrl(e.target.value)} type="text" className=" bg-white px-4 shadow  rounded-md outline-none py-2 p-2 w-full text-black h-[40px] " placeholder="Enter url" />
                <button onClick={() => handleSubmit()} className=" w-[150px] rounded-[4px] text-white capitalize shadow cursor-pointer bg-orange-400 h-[39px] text-base ">send</button>
            </div>
            <p className=" text-center text-orange-400 py-3 font-bold ">Historical data</p>
            {
                [...history]?.reverse()?.map((item) => {
                    return (
                        <div key={item._id} className=" flex justify-between items-center  bg-gray-100  text-black hover:shadow-md transition-all ease-linear   p-1 h-[40px] rounded-[8px] cursor-pointer ">
                            <p className=" text-lg text-black px-1 ">{item.method}</p>
                            <p>{item.url}</p>
                            <img src="delete.png" onClick={() => handleDelete(item._id)} className=" w-[20px] h-[20px]" />
                        </div>
                    )
                })
            }

        </div>
    )
}