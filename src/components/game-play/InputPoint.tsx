import { Input } from "../ui/input";

type Props = {
  points: number;
  setPoints: (pater: number) => void;
};

const InputPoint = ({ points, setPoints }: Props) => {
  return (
    <Input
      value={points}
      onChange={(e) => {
        const value = e.target.value;
        const numberValue = Number(value);
        if (!isNaN(numberValue)) {
          setPoints(numberValue);
        }
      }}
      className="flex-1"
    />
  );
};

export default InputPoint;
