import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {  useNavigate } from "react-router-dom";

interface Props {
  title: string;
  content?: string;
  link?: string;
  id?: number;
}
export default function HeroCard({ title, content, id, link }: Props) {
  const navigate=useNavigate()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      {content?.length && (
        <>
          <CardContent>
            <p>{content}</p>
          </CardContent>
          <CardFooter>
            {link && <button onClick={()=>navigate(link)} >Go To Detail Page</button>}
          </CardFooter>
        </>
      )}
    </Card>
  );
}
