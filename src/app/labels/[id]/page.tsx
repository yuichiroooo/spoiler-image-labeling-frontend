"use client";
import { useEffect, useState } from "react";
import ImageCard from "@/app/_components/Card"
import axios from "axios";
import useUserNameStore from "@/store/UserName";
import useUserProgressStore from "@/store/UserProgress";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type ImageMeta = {
    video_id: string;
    channel: string;
};

export default function Label() {
    const userName: string = useUserNameStore.getState().name;
    const progress: number = useUserProgressStore.getState().progress;
    const initialLabels: number[] = [0, 0, 0, 0, 0];
    const [labels, setLabels] = useState<number[]>([...initialLabels]);
    const [metas, setMetas] = useState<ImageMeta[]>([]);
    const router = useRouter();

    const handleRadioChange = (index: number, value: string) => {
        const newLabels = [...labels];
        newLabels[index] = parseInt(value);
        setLabels(newLabels);
    };

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_PROXY}/image/${progress}`).then((res) => {
            setMetas(res.data);
        })
    }, [progress]);

    const postData = async (index: number) => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_PROXY}/labels`, {
            video_id: metas[index].video_id,
            channel: metas[index].channel,
            user: userName,
            spoiler_degree: labels[index]
        });
    }

    const updateProgress = async () => {
        await axios.put(`${process.env.NEXT_PUBLIC_API_PROXY}/users/update?name=${userName}`);
    }

    const submitLabels = async () => {
        for (let i = 0; i < metas.length; i++) {
            await postData(i);
        }

        await updateProgress();

        if (progress + 5 === 8000) {
            router.push("/complete");
        }
        else {
            useUserProgressStore.getState().setProgress(progress + 5);
            setLabels([...initialLabels]);
            window.scrollTo(0, 0);
        }
    }

    return (
        <div className="flex flex-col">
            <p className="flex justify-center mt-8">進行度：{progress} / 8000</p>
            {metas.map((meta, index) => {
                return (
                    <ImageCard
                        key={index}
                        video_id={meta.video_id}
                        label={labels[index].toString()}
                        onRadioChange={(value) => handleRadioChange(index, value)}
                    />
                )
            })}
            <Button className="m-8 mx-auto" onClick={submitLabels}>送信</Button>
        </div>
    )
}