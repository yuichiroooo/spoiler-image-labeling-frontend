import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import Image from "next/image";

type ImageCardProps = {
    video_id: string;
    label: string;
    onRadioChange: (value: string) => void;
};

const ImageCard = ({ video_id, label, onRadioChange }: ImageCardProps) => {

    return (
        <Card className="w-[420px] mx-auto outline mt-8 p-1">
            <CardContent>
                <Image src={`${process.env.NEXT_PUBLIC_API_PROXY}/images/${video_id}.jpg`} alt="Picture of sports" priority width={400} height={300} />
            </CardContent>
            <CardFooter className="justify-center">
                <RadioGroup className="flex flex-col md:flex-row" value={label} onValueChange={onRadioChange}>
                    <div className="flex items-center space-x-1">
                        <RadioGroupItem value="0" id={"r0_"+video_id} />
                        <Label htmlFor={"r0_"+video_id}>わからない</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                        <RadioGroupItem value="1" id={"r1_"+video_id} />
                        <Label htmlFor={"r1_"+video_id}>予想できる</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                        <RadioGroupItem value="2" id={"r2_"+video_id} />
                        <Label htmlFor={"r2_"+video_id}>明らかにわかる</Label>
                    </div>
                </RadioGroup>
            </CardFooter>
        </Card>
    )
}

export default ImageCard;