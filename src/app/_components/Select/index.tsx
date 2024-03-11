"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios";
import useUserNameStore from "@/store/UserName";
import useUserProgressStore from "@/store/UserProgress";

type User = {
    id: number;
    name: string;
    progress: number;
}

export default function SelectUser() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_PROXY}/users/all`)
            .then((res) => setUsers(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleClick = async () => {
        const userName: string = useUserNameStore.getState().name;
        
        await axios.get(`${process.env.NEXT_PUBLIC_API_PROXY}/users/me?name=${userName}`)
            .then((res) => {
                useUserProgressStore.getState().setProgress(res.data.progress)
                const id: number = res.data.id;
                
                router.push(`/labels/${id}`);
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <Select onValueChange={(e) => useUserNameStore.getState().setName(e)}>
                <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="ユーザを選んでください" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>ユーザ</SelectLabel>
                        {users.map((user) => ( 
                            <SelectItem key={user.id} value={user.name}>{user.name}</SelectItem> 
                        ))} 
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Button onClick={handleClick}>決定</Button>
        </>
    )
}