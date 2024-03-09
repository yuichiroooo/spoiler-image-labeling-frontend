import Description from "./_components/Description";
import SelectUser from "./_components/Select";

export default function Home() {
  return (
    <>
      <Description />
      <div className="flex justify-center space-x-3">
        <SelectUser />
      </div>
    </>
  );
}
